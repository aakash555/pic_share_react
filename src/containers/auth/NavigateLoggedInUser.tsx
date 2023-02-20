import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

const NavigateLoggedInUser = ({ children }: any) => {
  const isUserLoggedIn = useAppSelector(state => state.user.isLoggedIn)

  return isUserLoggedIn ? children : <Navigate to={"/login"} />
}

export default NavigateLoggedInUser