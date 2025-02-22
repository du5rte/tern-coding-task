import tinydate from "tinydate";

const pad = (n: number) => n.toString().padStart(2, "0");

export function formatSeconds(s: number): string {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.floor(s % 60);

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  return `${pad(minutes)}:${pad(seconds)}`;
}

const recentFormatter = tinydate("{HH}:{mm}:{ss}");
const distantFormatter = tinydate("{DD}.{MM}.{YY}");

export function formatDate(date: Date | string | number): string {
  const now = new Date();
  const past = new Date(date)
  
  const diffInDays = Math.floor(
    (now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays < 7) {
    const isToday = now.toDateString() === past.toDateString();
    const weekDay = past.toLocaleDateString('en-US', { weekday: 'long' })
    
    return  `${isToday ? 'Today' : weekDay} ${recentFormatter(past)}`;
  }

  return distantFormatter(past);
}
