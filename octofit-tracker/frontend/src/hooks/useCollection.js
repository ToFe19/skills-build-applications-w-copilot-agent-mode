import { useEffect, useState } from 'react'
import { collectionItems } from '../api.js'

export function useCollection(loadCollection) {
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState({ items: [], status: 'loading', error: '' })

  useEffect(() => {
    const controller = new AbortController()
    let isCurrent = true

    async function load() {
      setState((previous) => ({ ...previous, status: 'loading', error: '' }))

      try {
        const response = await loadCollection(controller.signal)
        if (!response.ok) {
          throw new Error(`The API returned ${response.status}.`)
        }

        const items = collectionItems(await response.json())
        if (isCurrent) {
          setState({ items, status: 'ready', error: '' })
        }
      } catch (error) {
        if (!isCurrent || error.name === 'AbortError') {
          return
        }

        setState({
          items: [],
          status: 'error',
          error: error instanceof Error ? error.message : 'Unable to load this collection.',
        })
      }
    }

    void load()
    return () => {
      isCurrent = false
      controller.abort()
    }
  }, [loadCollection, requestVersion])

  return {
    ...state,
    retry: () => setRequestVersion((version) => version + 1),
  }
}