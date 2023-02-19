import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

import React, { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

import "./styles/header.css"
import Logo from './Logo';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';
import LocalStorage from '../services/local-storage';
import Modal from './Modal';
import Input from './Input';
import PicturesService from '../services/pictures';
import { addPicture, setPictures, toggleIsScrollObserved } from '../redux/slices/picturesSlice';
import { IAddPictureResponse, IHeaderProps } from '../interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import { toggleIsFavoritesPage } from '../redux/slices/favoritesPageSlice';
import { showSnackbar } from '../redux/slices/snackbarSlice';

const picturesServiceObject = new PicturesService()
const localStorageServiceObject = new LocalStorage()


const Header = ({ isUserLoggedIn, username }: IHeaderProps) => {
  const [isUserLoggedInState, setIsUserLoggedInState] = useState(isUserLoggedIn);
  const [usernameState, setUsernameState] = useState(username);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddingPicture, setIsAddingPicture] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const [newPictureUrl, setNewPictureUrl] = useState("")
  const [newPictureTitle, setNewPictureTitle] = useState("")

  useEffect(() => {
    setIsUserLoggedInState(isUserLoggedIn);
  }, [isUserLoggedIn])

  useEffect(() => {
    setUsernameState(username);
  }, [username])



  const drawer = <Box className="drawer-container" sx={{ textAlign: 'center', height: "100%" }}>
    <div className="logo-hamburger-container">
      <span className="logo-container">
        <Logo className="header-logo" />
      </span>
      <IconButton
        className="hamburger-icon"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'block', md: 'block' } }}
      >
        <CloseIcon />
      </IconButton>
    </div>

    <div className={`drawer-actions ${isUserLoggedInState ? "" : "drawer-actions-not-logged-in"}`}>
      {isUserLoggedInState ? <Box className="page-links-container" sx={{ display: { xs: 'block', sm: 'block' } }}>
        <div
          onClick={
            () => {
              navigate("/")
              dispatch(toggleIsFavoritesPage(false));
              dispatch(setPictures([]))
              dispatch(toggleIsScrollObserved(true))
            }
          }
          className={`page-link ${window.location.pathname === "/" ? "page-link-active" : ""}`}
        >
          Home
        </div>

        <div
          onClick={
            () => {
              navigate("/favorites")
              dispatch(toggleIsFavoritesPage(true))
              dispatch(setPictures([]))
              dispatch(toggleIsScrollObserved(true))
            }
          }
          className={`page-link ${window.location.pathname === "/favorites" ? "page-link-active" : ""}`}
        >
          Favorites
        </div>
      </Box> : null
      }

      <Box className="header-menu-container" sx={{ display: { xs: 'block', sm: 'block' } }}>
        {isUserLoggedInState ? <div className="header-menu drawer-header-menu-logged-in-state">
          <Button
            materialButtonProps={{
              className: "login-button",
              onClick: () => setIsModalVisible(true)
            }}
            type="primary"
          >
            Share Pic
          </Button>
          <div className="username"><span>Hi </span><span>{usernameState}</span></div>
          <div
            className="log-out-button"
            onClick={() => {
              localStorageServiceObject.removeLocalStorageItem("username");
              dispatch(setUserData({ "username": "", "isLoggedIn": false }))
            }}
          >
            Log out
          </div>
        </div> : <div className="header-menu drawer-header-menu-not-logged-in-state">
          <Button
            materialButtonProps={{
              className: "login-button",
              onClick: () => navigate("/login")
            }}
            type="primary"
          >
            Login
          </Button>
        </div>
        }
      </Box>
    </div>
  </Box>

  return (
    <div className="header-container">
      <AppBar component="nav" className="header">
        <div className="header-inner-container">

          <Toolbar>
            <IconButton
              className="hamburger-icon"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              style={{ color: "black", display: "flex" }}
              component="div"
              sx={{ flexGrow: 1, justifyContent: { xs: "center", sm: "flex-start" } }}
            >
              <Logo onClick={() => { navigate("/") }} className="header-logo" />

              {isUserLoggedInState ? <Box className="page-links-container" sx={{ display: { xs: "none", sm: "none", md: 'flex' } }}>
                <div
                  onClick={
                    () => {
                      navigate("/")
                      dispatch(toggleIsFavoritesPage(false));
                      dispatch(setPictures([]))
                      dispatch(toggleIsScrollObserved(true))
                    }
                  }
                  className={`page-link ${window.location.pathname === "/" ? "page-link-active" : ""}`}
                >
                  Home
                </div>

                <div
                  onClick={
                    () => {
                      navigate("/favorites")
                      dispatch(toggleIsFavoritesPage(true))
                      dispatch(setPictures([]))
                      dispatch(toggleIsScrollObserved(true))
                    }
                  }
                  className={`page-link ${window.location.pathname === "/favorites" ? "page-link-active" : ""}`}
                >
                  Favorites
                </div>
              </Box> : null
              }
            </Box>

            <Box className="header-menu-container" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
              {isUserLoggedInState ? <Box className="header-menu header-menu-logged-in-state" sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
                <Button
                  materialButtonProps={{
                    className: "login-button",
                    onClick: () => setIsModalVisible(true)
                  }}
                  type="primary"
                >
                  Share Pic
                </Button>
                <div className="username"><span>Hi </span><span>{usernameState}</span></div>
                <div
                  className="log-out-button"
                  onClick={() => {
                    localStorageServiceObject.removeLocalStorageItem("username");
                    dispatch(setUserData({ "username": "", "isLoggedIn": false }))
                  }}
                >
                  Log out
                </div>
              </Box> : <Box className="header-menu header-menu-not-logged-in-state">
                <Button
                  materialButtonProps={{
                    className: "login-button",
                    onClick: () => navigate("/login")
                  }}
                  type="primary"
                >
                  Login
                </Button>
              </Box>}
            </Box>
          </Toolbar>
        </div>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', maxWidth: "300px", width: "90%" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Modal
        title="Share A New Picture"
        style={{
          height: "420px",
          width: "700px"
        }}
        isVisible={isModalVisible}
        onCancel={() => { setIsModalVisible(false) }}
        footer={
          !isAddingPicture ? <div className="footer-buttons">
            <Button
              materialButtonProps={{
                className: "cancel-button",
                onClick: () => {
                  setNewPictureTitle("");
                  setNewPictureUrl("");
                  setIsModalVisible(false)
                }
              }}
              type="simple"
            >
              Cancel
            </Button>
            <Button
              materialButtonProps={{
                className: "share-button",
                onClick: () => {
                  setIsAddingPicture(true);

                  picturesServiceObject.addPicture({
                    title: newPictureTitle,
                    url: newPictureUrl,
                    username: username
                  }).then((response: IAddPictureResponse) => {
                    if (response.success) {
                      if (response.data)
                        dispatch(addPicture(response.data));

                      setNewPictureTitle("");
                      setNewPictureUrl("");
                      setIsModalVisible(false);

                      dispatch(showSnackbar({
                        message: "Picture added successfully!",
                        isOpen: true,
                        severity: "success"
                      }))
                    } else {
                      throw new Error(response.message)
                    }
                  }).catch((error: any) => {
                    console.error("Error adding picture", error);
                    dispatch(showSnackbar({
                      message: "Error adding picture",
                      isOpen: true,
                      severity: "error"
                    }))
                  }).finally(() => {
                    setIsAddingPicture(false);
                  })
                }
              }}
              type="primary"
            >
              Share
            </Button>
          </div> : <CircularProgress />
        }
      >
        <Input
          value={newPictureUrl}
          materialInputProps={{
            className: "new-picture-input",
            onChange: (event: any) => setNewPictureUrl(event.target.value),
            style: { width: "280px" },
            placeholder: "New picture URL"
          }}
        />
        <br />
        <Input
          value={newPictureTitle}
          materialInputProps={{
            className: "new-picture-input",
            onChange: (event: any) => setNewPictureTitle(event.target.value),
            style: { width: "280px" },
            placeholder: "Title"
          }}
        />
      </Modal>
    </div>
  );
}

export default Header;