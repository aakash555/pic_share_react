import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesPageState {
  isFavoritesPage: boolean;
}

const initialState:FavoritesPageState = {
  isFavoritesPage: false
}

export const favoritesPageSlice = createSlice({
  name: 'favoritesPage',
  initialState,
  reducers: {
    toggleIsFavoritesPage: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesPage = action.payload;
    }
  }
})

export const { toggleIsFavoritesPage } = favoritesPageSlice.actions;

export default favoritesPageSlice.reducer;