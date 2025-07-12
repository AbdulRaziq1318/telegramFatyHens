export async function getTasks() {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRNf8M2mLcOTSJMO-8XK2lMJ-B7w_L6nppUBUiNsGkciA-wtGKLKlT3IeQzIZsqRS3pOZniRd3BnXaw/pub?output=csv"
  );
  const text = await response.text();
  const rows = text.trim().split("\n").slice(1); // remove header

  const tasks = rows.map((row, index) => {
    const [title, link, reward, image] = row.split(",");
    return {
      id: index.toString(),
      title,
      link,
      reward: parseInt(reward),
      image,
    };
  });

  return tasks;
}
