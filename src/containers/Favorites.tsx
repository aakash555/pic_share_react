import React from 'react'
import PictureGrid from '../components/PictureGrid'
import "./styles/favorites.css"


const Favorites = () => {
  return (
    <div className="content-container favorites-container">
      <p className="favorites-title">Your Saved Pictures</p>
      <div className="pictures-container">
        <PictureGrid />
      </div>
    </div>
  )
}

export default Favorites