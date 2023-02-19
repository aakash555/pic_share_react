import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// To call aN action
export const useAppDispatch: () => AppDispatch = useDispatch

// To get data from redux store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector