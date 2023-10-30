export default function date2str(d: Date, withTime: boolean = false): string {
  const now = new Date();

  if(withTime) {
    if(d.getFullYear() !== now.getFullYear()) return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
    if(d.getMonth() !== now.getMonth() || d.getDate() !== now.getDate()) return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
    return `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
  }

  if(d.getFullYear() !== now.getFullYear()) return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  return `${d.getMonth() + 1}月${d.getDate()}日`
}
