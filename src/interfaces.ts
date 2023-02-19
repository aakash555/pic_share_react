// Component interfaces

export interface ILogoProps {
  className: string;
  onClick?: any
}

export interface IPictureData {
  id: string;
  title: string,
  url: string,
  username: string,
  uploadedOn: string,
  isFavorite?: boolean
}

export interface IPictureGrid {
  isFavoritesPage: boolean;
}

export interface IPictureCardProps {
  pictureData: IPictureData
}

export interface IHeaderProps {
  isUserLoggedIn: boolean;
  username: string;
}

export interface IMaterialButtonProps {
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  color?: any;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  href?: string;
  variant?: 'contained' | 'outlined' | 'text'
  onClick: any
}


type ButtonType = "primary" | "simple"
export interface IButtonProps {
  materialButtonProps: IMaterialButtonProps,
  children: React.ReactNode
  type: ButtonType
}

export interface IMaterialInuptProps {
  id?: string;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  startIcon?: React.ReactNode;
  onChange?: any;
  multiline?:	boolean;
  placeholder?:	string;
  rows?:number|string;
  name?: string;
  value?: string;
}

export interface IInputProps {
  materialInputProps: IMaterialInuptProps;
  value: string;
  className?: string;
}

// Container props

export interface IFavoritesProps {
  isUserLoggedIn: boolean;
  username: string;
}

export interface IHomeProps {
  isUserLoggedIn: boolean;
  username: string;
}


// Json type prop
export interface IJsonObject {
  [key: string]: any
}

// Auth service interfaces
export interface ILoginUserBodyData {
  "username": string
}

export interface ILoginUserResponse {
  "success":boolean,
  "message"?: string
}

// Pictures service interfaces
export interface ILoadPictureListResponseBodyData {
  "username"?: string,
  "skip"?: number,
  "isFavoritesPage"?: boolean
}

export interface ILoadPictureListResponse {
  "success": boolean,
  "data": IPictureData[],
  "message"?: string
}  

export interface IAddPictureBodyData {
  "username": string
  "title": string,
  "url": string
}
export interface IAddPictureResponse {
  "success":boolean,
  "data"?:IPictureData
  "message"?: string
}

export interface IUpdateIsPictureFavoriteBodyData {
  "username": string;
  "photo_id": number;
  "is_set_favouroute_request": boolean;
}

export interface IUpdateIsPictureFavoritetResponse {
  "success":boolean,
  "message"?: string
}