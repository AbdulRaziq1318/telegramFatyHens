import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import TelegramBot from "node-telegram-bot-api";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🟡 Telegram Bot Setup
const BOT_TOKEN = process.env.BOT_TOKEN!;
const WEB_APP_URL = "https://telegramfatyhens.onrender.com";

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is not defined in environment variables");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "👋 Welcome to FatHen!\nClick below to collect eggs 🥚", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Launch FatHen",
            web_app: { url: WEB_APP_URL },
          },
        ],
      ],
    },
  });
});

console.log("✅ Telegram bot is running...");

// 🟢 Logger
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// 🟢 Launch server
(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);

  server.listen(port, () => {
    log(`✅ Server + Bot running on http://localhost:${port}`);
  });
})();
