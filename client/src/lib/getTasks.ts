// src/lib/getTasks.ts
export async function getTasks() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSODduSlYFBRMB2YcuKYvMhg8wir38V_p6U-LOshlC-JPexB_osbZywhfZaM-rg7xjeKjwKfjymBqTa/pub?output=csv"
  );
  const text = await res.text();

  const rows = text.split("\n").slice(1); // skip header
  const tasks = rows.map((row, index) => {
    const [title, description, link, rewardStr, icon] = row.split(",");

    return {
      id: `task-${index}`,
      title: title?.trim(),
      description: description?.trim(),
      link: link?.trim(),
      reward: Number(rewardStr?.trim()) || 0,
      icon: icon?.trim(),
    };
  });

  return tasks.filter((task) => task.title); // remove empty rows
}
