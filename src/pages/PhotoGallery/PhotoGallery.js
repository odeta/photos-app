import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './PhotoGallery.css';
import useInfiniteFetching from './useInfiniteFetching'

function PhotoGallery() {
  const [page, setPage] = useState(1)
  const { hasNext, list, loading, loadItems } = useInfiniteFetching()
  const observer = useRef();

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPage((prevPage) => prevPage + 1)
          loadItems(page)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasNext, observer]
  );

  useEffect(() => {
    loadItems(page)
  }, [])

  return (
    <div className="PhotoGallery">
      {!list.length && loading && (
        [...Array(30).keys()].map((number) => (
          <div
            key={number}
            className="PhotoGallery-photoWrapper"
          >
            <div className="PhotoGallery-photoSkeleton" />
          </div>
        ))
      )}

      {list.map((photo, index) => (
        <div
          key={photo.id}
          className="PhotoGallery-photoWrapper"
          ref={index + 1 === list.length ? lastPhotoRef : undefined}
        >
          <Link to={photo.id}>
            <img
              alt={photo.title}
              className="PhotoGallery-photo"
              src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
            />
          </Link>
        </div>
      ))}

      {loading && list.length && (
        <div className="PhotoGallery-loading">Loading more photos...</div>
      )}
    </div>
  );
}

export default PhotoGallery;