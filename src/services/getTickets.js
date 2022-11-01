export default async function getTickets(searchId) {
  let data
  try {
    const response = await fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${searchId}`)
    if (response.ok) {
      data = await response.json()
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}
