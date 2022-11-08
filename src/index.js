import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css';
import App from './App'
import Error from './pages/Error';
import PhotoGallery from './pages/PhotoGallery';
import PhotoReview from './pages/PhotoReview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/photos',
        element: <PhotoGallery />
      },
      {
        path: '/photos/:id',
        element: <PhotoReview />
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
