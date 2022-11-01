export default function durationFormat(minutes) {
  const hours = Math.floor(minutes / 60)
  minutes %= 60
  return `${hours >= 10 ? hours : '0'.concat(String(hours))}ч ${minutes >= 10 ? minutes : '0'.concat(String(minutes))}м`
}
