export default function trimText(s: string, n: number): string {
  if (s.slice(0, n).length >= s.length) {
    return s
  }

  return s.slice(0, n).trim() + '...'
}
