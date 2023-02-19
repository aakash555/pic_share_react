import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

import { Routes, Route } from 'react-router-dom';

import Home from './containers/Home';
import NavigateLoggedInUser from './containers/auth/NavigateLoggedInUser';
import NavigateNotLoggedInUser from './containers/auth/NavigateNotLoggedInUser';
import Login from './containers/Login';
import Favorites from './containers/Favorites';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import LocalStorage from './services/local-storage';
import { setUserData } from './redux/slices/userSlice';
import { setPictureModalData } from './redux/slices/picturesSlice';
import Modal from './components/Modal';
import Snackbar from '@mui/material/Snackbar';
import { hideSnackbar } from './redux/slices/snackbarSlice';
import { toggleIsFavoritesPage } from './redux/slices/favoritesPageSlice';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const localStorageServiceObject = new LocalStorage();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App(props: any) {
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const username = useAppSelector(state => state.user.username);
  const isUserLoggedIn = useAppSelector(state => state.user.isLoggedIn);
  const snackbar = useAppSelector(state => state.snackbar);

  const pictureModalData = useAppSelector(state => state.pictures.pictureModalData)

  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorageServiceObject.getLocalStorageItem("username", false);

    if (username) {
      dispatch(setUserData({ "isLoggedIn": true, "username": username }));
    }

    if (window.location.pathname === "/favorites") {
      dispatch(toggleIsFavoritesPage(true));
    }
    setUserDataLoaded(true)
  }, [])


  return (
    <div className="app-container">
      <Header isUserLoggedIn={isUserLoggedIn} username={username} />

      {
        userDataLoaded ? <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <NavigateNotLoggedInUser>
                  <Login />
                </NavigateNotLoggedInUser>
              }
            />

            <Route
              path="/favorites"
              element={
                <NavigateLoggedInUser >
                  <Favorites />
                </NavigateLoggedInUser>
              }
            />
          </Routes>
        </div> : null
      }

      <Modal
        className="view-picture-modal"
        title={
          <div className="picture-modal-header">
            <span className="picture-modal-title picture-modal-title-title">{pictureModalData.selectedPictureData.title}</span>
            <span className="picture-modal-title picture-modal-title-uploaded-on">{pictureModalData.selectedPictureData.uploadedOn}</span>
          </div>
        }
        style={{
          height: "600px",
          width: "700px"
        }}
        isVisible={pictureModalData.isPictureModalVisible}
        onCancel={() => {
          dispatch(setPictureModalData({
            isPictureModalVisible: false,
            selectedPictureData: {
              "id": "",
              "title": "",
              "username": "",
              "url": "",
              "uploadedOn": ""
            }
          }))
        }}
      >
        <img className='picture-modal-image' src={pictureModalData.selectedPictureData.url} />
      </Modal>

      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={5000}
        onClose={() => { dispatch(hideSnackbar()) }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => { dispatch(hideSnackbar()) }} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
