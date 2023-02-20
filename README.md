# Requirements
- [Node v16+](https://nodejs.org/)

# To setup the repository
npm install

# To start the frontend server
npm run start
It will start the server on http://localhost:3000

# Backend Server
The default backend server is configured to run on http://localhost:4000. To change it, edit apiServiceUrl in src/config.ts
# Folder structure:

## Components
Contains all the reusble components.
The styles folder contains the css of the components. (names similar to the file names)

  ### Button
  MUI Button component

  ### Input
  MUI Input component

  ### Modal
  Custom built modal component

  ### Header
  Website header component (needs mobile responsive menu)

  ### Logo
  Logo of the website

  ### PictureCard
  The picture card component

  ### PictureGrid
  Renders the grid of picture cards


## Containers
Contains the important containers used in the website

  ### auth folder
  Contains the components that manage the routing based on the user authentication

    #### NavigateLoggedInUser
    Component to handle the scenario where the user is logged in (the user should be redirected to the home page if /login page is visited)

    #### NavigateNotLoggedInUser
    Component to handle the scenario where the user is not logged in (the user should be redirected to the login page if /favorites page is visited)

  ### Favorites
  Renders the favorite pictures of the user

  ### Home
  Home page of the application which renders the card with like button if the user is logged in else renders the cards without the like button

  ### Login
  Page contains a login form that logs in the user based on username, sets it in local storage and also sets the store state of the user


## Redux


## Services
Contains the services used by the application

  ### Auth
  User authorization service

    ####  loginUser
    To check if the user is logged in otherwise sign up the user

  ### LocalStorage Service
  Performs the local storage operations

    #### getLocalStorageItem
    Retrive data from local storage (Pass the key and if the value is an object to get the stored data)

    #### setLocalStorageItem
    Store data in local storage, (Pass a key and a value)

    #### removeLocalStorageItem
    Delete an item from the local storage (Pass a key)

  ### Pictures Service
  To perform operations on pictures

    #### loadPicturesList
    Loads picture list based on the specified parameters.
    if isFavoritePage is passed, the picture list will only contain the favorite pictures of the user

    #### addPicture
    To add picture to the picture list.

    #### updatePictureIsFavorite
    To update if the picture is a favorite of the user.


## Redux

  ### hooks
  Contains custom hooks 1) to dispatch an action and 2) To get data from store

  ### store
  Creates the redux store

  ### userSlice
  To define the initialState, actions and reducers used for user operations.
  ### pictureSlice
  To define the initialState, actions and reducers used for picture operations like getting list, adding to the list, updating favorite etc.
  ### snackbarSlice
  To define the initialState, actions and reducers used to hide and show snackbar. (global state for easy access in any component)
  ### favoritesPageSlice
  To define the initialState, actions and reducers used to check for favorites page.


## hooks

  ### useFetch
  A custom hook to fetch the next set of images when the user scrolls down.

  ### useInfiniteScroll
  Add infinite scroll to the pictures grid using the IntersectionObserver API

## App.tsx
Renders the header and the main content of the application


## index.tsx
Entry point of the application


## interfaces.ts
Contains the interfaces used by the components and the containers in the application


## config.ts
Contains the configurations used by the application (currently it has the apiServiceDomain which is the root domain for API requests)