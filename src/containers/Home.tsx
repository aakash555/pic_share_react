import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PictureGrid from '../components/PictureGrid'
import { IHomeProps } from "../interfaces"
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setPictures } from '../redux/slices/picturesSlice'
import PicturesService from "../services/pictures"
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