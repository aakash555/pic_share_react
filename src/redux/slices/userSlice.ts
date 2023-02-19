import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  username: string;
}

const initialState:UserState = {
  isLoggedIn: false,
  username: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
    }
  }
})

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;