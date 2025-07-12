const TelegramBot = require("node-telegram-bot-api");

// Get token from environment variable
const token = process.env.BOT_TOKEN;

// Web App URL
const WEB_APP_URL = "https://telegramfatyhens.onrender.com";

// Initialize bot with polling
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "👋 Welcome to FatHen!\nClick the button below to start collecting eggs 🥚", {
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
