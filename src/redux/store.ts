import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import picturesReducer from "./slices/picturesSlice"
import snackbarReducer from "./slices/snackbarSlice"
import favoritesPageReducer from "./slices/favoritesPageSlice"


const store = configureStore({
  reducer: {
    user: userReducer,
    pictures: picturesReducer,
    snackbar: snackbarReducer,
    favoritesPage: favoritesPageReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;