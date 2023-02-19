
import { useState, useEffect, useCallback } from 'react';
import { ILoadPictureListResponse, ILoadPictureListResponseBodyData } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addPictures, toggleIsScrollObserved } from '../redux/slices/picturesSlice';
import { showSnackbar } from '../redux/slices/snackbarSlice';
import PicturesService from '../services/pictures';

function useFetch(page: number, bodyData: ILoadPictureListResponseBodyData) {
  const [loading, setLoading] = useState(false);
  const isFavoritesPage = useAppSelector(state => state.favoritesPage.isFavoritesPage)
  const isScrollObserved = useAppSelector((state) => state.pictures.isScrollObserved)

  const dispatch = useAppDispatch()
  const picturesServiceApiObject = new PicturesService()

  const getPictures = useCallback(async () => {
    if (isScrollObserved) {
      dispatch(toggleIsScrollObserved(false))
      setLoading(true);

      picturesServiceApiObject.loadPicturesList(
        {...bodyData, isFavoritesPage}
      ).then((response: ILoadPictureListResponse) => {
        if (response.success) {
          dispatch(addPictures(response.data))

          // Stop infinite scrolling if the data length is less than 12
          if (response.data.length < 12) {
            dispatch(toggleIsScrollObserved(false))
          } else {
            dispatch(toggleIsScrollObserved(true))
          }
        } else {
          throw new Error(response.message)
        }
      }).catch((error: any) => {
        dispatch(showSnackbar({
          message: "Could not load pictures",
          severity: "error"
        }))
        console.error("Error fetching pictures", error)
      }).finally(() => {
        setLoading(false);
      })
    }
  }, [page]);

  useEffect(() => {
    getPictures();
  }, [getPictures]);

  return { loading };
}

export default useFetch;