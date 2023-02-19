import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPictureData } from "../../interfaces";

interface IPictureModal {
  isPictureModalVisible: boolean;
  selectedPictureData: IPictureData;
}

interface IIsPictureFavoritePayload {
  id: string,
  isFavorite: boolean
}

interface PicturesState {
  pictures: IPictureData[]
  pictureModalData: IPictureModal,
  isScrollObserved: boolean,
  skip: number
}

const initialState: PicturesState = {
  pictures: [],
  pictureModalData: {
    isPictureModalVisible: false,
    selectedPictureData: {
      id: "",
      title: "",
      url: "",
      uploadedOn: "",
      username: ""
    }
  },
  skip: 0,
  isScrollObserved: true
}

export const picturesSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    setPictureModalData: (state, action: PayloadAction<IPictureModal>) => {
      state.pictureModalData.isPictureModalVisible = action.payload.isPictureModalVisible;
      state.pictureModalData.selectedPictureData = action.payload.selectedPictureData;
    },

    setPictures: (state, action: PayloadAction<IPictureData[]>) => {
      state.pictures = action.payload;
    },

    addPicture: (state, action: PayloadAction<IPictureData>) => {
      state.pictures = [action.payload, ...state.pictures]
    },

    addPictures: (state, action: PayloadAction<IPictureData[]>) => {
      state.pictures = [...state.pictures, ...action.payload]
    },

    updateIsPictureFavorite: (state, action: PayloadAction<IIsPictureFavoritePayload>) => {
      const _pictures = JSON.parse(JSON.stringify(state.pictures))

      for (let i = 0; i < _pictures.length; i++) {
        if (action.payload.id === _pictures[i].id) {
          _pictures[i].isFavorite = action.payload.isFavorite;
        }
      }

      state.pictures = _pictures;
    },

    toggleIsScrollObserved: (state, action: PayloadAction<boolean>) => {
      state.isScrollObserved = action.payload;
    }
  }
})

export const { setPictureModalData, setPictures, addPicture, addPictures, updateIsPictureFavorite, toggleIsScrollObserved } = picturesSlice.actions;

export default picturesSlice.reducer;