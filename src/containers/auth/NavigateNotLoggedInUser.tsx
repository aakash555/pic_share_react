import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

const NavigateNotLoggedInUser = ({ children } : any) => {
  const isUserLoggedIn = useAppSelector(state => state.user.isLoggedIn)

  return !isUserLoggedIn ? children : <Navigate to="/" />
}

export default NavigateNotLoggedInUser