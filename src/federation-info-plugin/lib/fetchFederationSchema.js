async function fetchFederationSchema(url) {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return await data.json().catch(() => data.text())
}

export default fetchFederationSchema
