/* eslint-disable */
export default function stopsQuantity(arr) {
  const quantity = arr.length
  switch (quantity) {
    case 0:
      return 'без пересадок'
    case 1:
      return '1 пересадка'
    default:
      return `${quantity} пересадки`
  }
}
