import { IAddPictureBodyData, ILoadPictureListResponseBodyData, IPictureData, IUpdateIsPictureFavoriteBodyData } from "../../interfaces";
import ApiService from "../api";

class Pictures {
  constructor(readonly basePath: string = "/photos", readonly apiServiceObject: ApiService = new ApiService("v1")) { }

  loadPicturesList = (bodyData: ILoadPictureListResponseBodyData): any => {
    return !bodyData.isFavoritesPage ? this.apiServiceObject.post(`${this.basePath}/list`, bodyData) : this.apiServiceObject.post(`${this.basePath}/listfavouroute`, bodyData);
  }

  addPicture = (bodyData: IAddPictureBodyData): any => {
    return this.apiServiceObject.post(`${this.basePath}/add`, bodyData);
  }

  updateIsPictureFavorite = (bodyData: IUpdateIsPictureFavoriteBodyData): any => {
    return this.apiServiceObject.post(`${this.basePath}/setfavouroute`, bodyData);
  }
}

export default Pictures;