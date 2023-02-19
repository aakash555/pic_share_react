import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  message: string,
  severity: any,
  isOpen?: boolean
}

const initialState:SnackbarState = {
  "message": "",
  "severity": "success",
  "isOpen": false
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      const {severity, message} = action.payload;
      state.message = message;
      state.severity = severity;
      state.isOpen = true;
    },

    hideSnackbar: (state) => {
      state.isOpen = false;
    }
  }
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;