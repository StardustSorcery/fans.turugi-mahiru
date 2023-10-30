export default function time2str(d: Date): string {
  return `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
}
