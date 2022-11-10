export default function sortFunction(mode) {
  if (mode === 'fastest') {
    return (a, b) => a.segments[0].duration - b.segments[0].duration
  }
  if (mode === 'optimal') {
    return (a, b) => a.price * a.segments[0].duration - b.price * b.segments[0].duration
  }
  return (a, b) => a.price - b.price
}
