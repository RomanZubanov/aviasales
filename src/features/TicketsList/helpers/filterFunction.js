export default function filterFunction(mode) {
  const { all, noTransfer, oneTransfer, twoTransfer, threeTransfer } = mode
  if (all) {
    return () => true
  }
  if (noTransfer) {
    return (item) => item.segments[0].stops.length === 0
  }
  if (oneTransfer || twoTransfer || threeTransfer) {
    const quantityStopsArr = []
    if (oneTransfer) {
      quantityStopsArr.push(1)
    }
    if (twoTransfer) {
      quantityStopsArr.push(2)
    }
    if (threeTransfer) {
      quantityStopsArr.push(3)
    }
    return (item) => quantityStopsArr.includes(item.segments[0].stops.length)
  }
  return () => false
}
