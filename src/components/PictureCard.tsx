import React, { useEffect, useState } from 'react'
import { IPictureCardProps, IUpdateIsPictureFavoritetResponse } from '../interfaces'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./styles/pictureCard.css"
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setPictureModalData, updateIsPictureFavorite } from '../redux/slices/picturesSlice';
import Pictures from '../services/pictures';
import { CircularProgress } from '@mui/material';
import { showSnackbar } from '../redux/slices/snackbarSlice';

const picturesServiceObject = new Pictures()

const PictureCard = ({ pictureData }: IPictureCardProps) => {
  const [pictureDataState, setPictureDataState] = useState(pictureData)
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false)
  const username = useAppSelector(state => state.user.username)
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPictureDataState({...pictureData})
  }, [pictureData])

  const onFavoriteIconClick = () => {
    setIsUpdatingFavorite(true)

    picturesServiceObject.updateIsPictureFavorite({
      is_set_favouroute_request: !pictureDataState.isFavorite,
      photo_id: parseInt(pictureDataState.id),
      username: username
    }).then((response: IUpdateIsPictureFavoritetResponse) => {
      if (response.success) {
        dispatch(updateIsPictureFavorite({
          "id": pictureDataState.id,
          "isFavorite": !pictureDataState.isFavorite
        }))

        dispatch(showSnackbar({
          message: "Favorite state updated!",
          isOpen: true,
          severity: "success"
        }))
      } else {
        throw new Error(response.message)
      }
    }).catch((error: any) => {
      dispatch(showSnackbar({
        message: "Error updating the favorite state",
        isOpen: true,
        severity: "error"
      }))
      console.error("Error updating is favorite: ", error)
    }).finally(() => {
      setIsUpdatingFavorite(false)
    })
  }

  return (
    <div className="picture-card">
      <div className="picture-container">
        <img loading="lazy" className="picture" src={pictureDataState.url} onClick={() => {
          dispatch(setPictureModalData({
            isPictureModalVisible: true,
            selectedPictureData: pictureDataState
          }))
        }} />
      </div>

      <p className="picture-title">{pictureDataState.title}</p>
      <div className="picture-details-favorite-container">
        <div className={`picture-details ${!username ? "user-not-logged-in" : ""}`}>
          <p className="picture-detail picture-detail-username">{pictureDataState.username}</p>
          <p className="picture-detail picture-detail-uploaded-on">{pictureDataState.uploadedOn}</p>
        </div>
        {
          username ? <div className="picture-favorite-container">
            {
              isUpdatingFavorite ? <CircularProgress /> : pictureDataState.isFavorite ?
                <FavoriteIcon onClick= {onFavoriteIconClick} className="favorite-icon favorite-icon-filled" /> : 
                <FavoriteBorderIcon onClick= {onFavoriteIconClick} className="favorite-icon favourite-icon-outline" />
            }
          </div> : null
        }
      </div>
    </div>
  )
}

export default PictureCard;
