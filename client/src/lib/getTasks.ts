export async function getTasks() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSODduSlYFBRMB2YcuKYvMhg8wir38V_p6U-LOshlC-JPexB_osbZywhfZaM-rg7xjeKjwKfjymBqTa/pub?output=csv"
  );
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line, index) => {
    const values = line.split(",");
    const task: Record<string, string> = {};
    headers.forEach((h, i) => {
      task[h.trim()] = values[i]?.trim() ?? "";
    });

    return {
      id: `task-${index}`,
      title: task["title"],
      description: task["description"],
      reward: parseInt(task["reward"]),
      link: task["link"],
      icon: task["icon"], // use icon value like telegram, link, etc.
    };
  });
}
