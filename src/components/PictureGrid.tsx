import { CircularProgress } from '@mui/material'
import React, { Fragment, ReactElement } from 'react'
import useFetch from '../hooks/useFetch'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { IPictureGrid, IPictureData } from '../interfaces'
import { useAppSelector } from '../redux/hooks'
import PictureCard from './PictureCard'
import "./styles/pictureGrid.css"


const PictureGrid = ({ isFavoritesPage = false }: IPictureGrid) => {
  const username = useAppSelector(state => state.user.username)
  let pictures = useAppSelector(state => state.pictures.pictures);

  const { loadMoreRef, page } = useInfiniteScroll();
  const { loading } = useFetch(page, { username, skip: pictures.length });

  const renderPictures = () => {
    return pictures.map((picture: IPictureData): ReactElement => {
      return <PictureCard key={picture.id} pictureData={picture} />
    })
  }

  return (
    <Fragment>
      <div className="picture-grid-container">
        {renderPictures()}
      </div>

      {/* Element that is being observed for the infinte scroll */}
      <div className="pictures-loader-container" ref={loadMoreRef}>
        {loading && <CircularProgress />}
      </div>
    </Fragment>
  )
}

export default PictureGrid