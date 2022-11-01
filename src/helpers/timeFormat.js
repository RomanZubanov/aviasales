export default function timeFormat(timeString, minutesAdded = 0) {
  const date = new Date(Date.parse(timeString) + minutesAdded * 60000)
  const hours = date.getUTCHours() >= 10 ? date.getUTCHours() : `0${date.getUTCHours()}`
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
  return `${hours}:${minutes}`
}
