import React, { useState } from 'react'
import { Button } from '../components/Button'
import Input from '../components/Input'
import Logo from '../components/Logo'
import LocalStorage from '../services/local-storage'
import Auth from '../services/auth'
import { useAppDispatch } from '../redux/hooks'
import { setUserData } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import "./styles/login.css"
import { CircularProgress } from '@mui/material'
import { showSnackbar } from '../redux/slices/snackbarSlice'

const localStorageServiceObject = new LocalStorage();
const authServiceObject = new Auth();

const Login = () => {
  const [username, setUsername] = useState("")
  const [displayLoggingInLoader, setDisplayLoggingInLoader] = useState(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onLogInClick = () => {
    authServiceObject.loginUser({
      username
    }).then((response:any) => {
      if (response.success) {
        dispatch(showSnackbar({
          isOpen: true,
          message: "Logged In",
          severity: "success"
        }))
        localStorageServiceObject.setLocalStorageItem("username", username)
        dispatch(setUserData({ username, isLoggedIn: true }))
        navigate("/")
      } else {
        throw new Error(response.message)
      }
    }).catch(error => {
      dispatch(showSnackbar({
        isOpen: true,
        message: "Could not log in",
        severity: "error"
      }))
      console.error("Could not log in: ", error);
    }).finally(() => {
      setDisplayLoggingInLoader(false);
    })
  }

  return (
    <div className="content-container container-login">
      <Logo className="login-logo" />
      <p className="login-tagline">Login to start sharing</p>
      <Input
        value={username}
        materialInputProps={{
          onChange: (event: any) => setUsername(event.target.value),
          style: { width: "280px" },
          placeholder: "Username"
        }}
      />
      <br />
      {
        displayLoggingInLoader ? <CircularProgress /> : <Button
          materialButtonProps={{
            className: "login-button",
            disabled: !username ? true : false,
            onClick: onLogInClick
          }}
          type="primary"
        >
          Log In
        </Button>
      }
    </div>
  )
}

export default Login