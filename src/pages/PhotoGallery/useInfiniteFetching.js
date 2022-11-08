import { useState } from "react"

const PHOTOS_PER_PAGE = 30

function useInfiniteFetching() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [list, setList] = useState([])
  const [hasNext, setHasNext] = useState(true)

  const loadItems = async (page) => {
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1&per_page=${PHOTOS_PER_PAGE}&page=${page}`

    setLoading(true)

    await fetch(apiUrl)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.stat !== 'ok') {
          setError('Fetching the photos failed')
        } else {
          setList((prevItems) => [...new Map([...prevItems, ...data.photos.photo].map((item) => [item.id, item])).values()])
          setHasNext(data.photos.page < data.photos.pages)
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }

  return {
    error,
    hasNext,
    list,
    loading,
    loadItems,
  }
}

export default useInfiniteFetching