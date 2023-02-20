import React from 'react'
import { NavLink } from 'react-router-dom'
import PictureGrid from '../components/PictureGrid'
import { useAppSelector } from '../redux/hooks'
import "./styles/home.css"


const Home = () => {
  const isUserLoggedIn = useAppSelector(state => state.user.isLoggedIn)

  return (
    <div className="content-container container-home">
      {
        !isUserLoggedIn ? <div className="user-not-logged-in-banner">
          <NavLink to="/login"><span className="login-link">Login</span></NavLink> to start sharing your favorite pictures with others!
        </div> : null
      }

      <PictureGrid
        isFavoritesPage={false}
      />
    </div>
  )
}

export default Home