import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './PhotoReview.css'

function PhotoReview() {
  const [photoData, setPhotoData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const params = useParams()

  useEffect(() => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${process.env.REACT_APP_API_KEY}&format=json&nojsoncallback=1&photo_id=${params.id}`

    setLoading(true)

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.stat !== 'ok') {
          setError('Fetching the photo failed')
        } else {
          setPhotoData(data.photo)
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="PhotoReview">
      {error && (
        <div>
          <h1>Oops!</h1>
          <p>{error}</p>
        </div>
      )}

      {!error && photoData?.title && (
        <>
          <div>
            <img
              alt={photoData.title?._content}
              className="PhotoReview-photo"
              src={`https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`}
            />
          </div>

          <div className="PhotoReview-info">
            <h2 className="PhotoReview-title -mb16">{!!photoData.title._content ? photoData.title._content : 'No title'}</h2>

            {photoData.description._content && (
              <h5 className="-mb16">{photoData.description._content}</h5>
            )}

            <h5 className="-mb64">{`- ${photoData.owner.realname} (${photoData.owner.username})`}</h5>

            {!!photoData.tags.tag.length && (
              <>
                <h5 className="-mb4">Tags:</h5>

                <div className="PhotoReview-tags -mb16">
                  {photoData.tags.tag.map((tag) => (
                    <div key={tag.id} className="PhotoReview-tag">{tag.raw}</div>
                  ))}
                </div>
              </>
            )}

            <a
              className="Link"
              href={photoData.urls?.url?.[0]?._content}
              rel="noopener noreferrer"
              target="_blank"
            >
              See the photo in Flickr
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default PhotoReview