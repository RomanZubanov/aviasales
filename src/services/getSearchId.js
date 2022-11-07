export default async function getSearchId() {
  let data
  try {
    const response = await fetch('https://front-test.dev.aviasales.ru/search')
    if (response.ok) {
      data = await response.json()
      return data
    }
    throw new Error(`${response.status}`)
  } catch (err) {
    return Promise.reject(err)
  }
}
