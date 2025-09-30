export const BACKEND_URL = "https://backend.ahmadadin.workers.dev/"


export function formatDate(input: string): string {
  const date = new Date(input);

  const day = date.getDate();
  const monthNames = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Add suffix
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
}
