const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName && /^[a-zA-Z0-9-]+$/.test(codespaceName)
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function collectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const candidates = [
      payload.results,
      payload.items,
      payload.data,
      payload.data?.results,
      payload.data?.items,
    ]
    const collection = candidates.find(Array.isArray)
    if (collection) {
      return collection
    }
  }

  throw new Error('The API response did not contain a collection.')
}