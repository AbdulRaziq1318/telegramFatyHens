export async function getTasks() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSODduSlYFBRMB2YcuKYvMhg8wir38V_p6U-LOshlC-JPexB_osbZywhfZaM-rg7xjeKjwKfjymBqTa/pub?output=csv');
  const text = await res.text();
  const rows = text.trim().split('\n').slice(1); // skip header

  return rows.map((row, i) => {
    const [title, description, reward, link, icon] = row.split(',');
    return {
      id: `${i + 1}`,
      title,
      description,
      reward: Number(reward),
      link,
      icon,
    };
  });
}
