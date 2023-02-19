import { ILoginUserBodyData, ILoginUserResponse } from "../../interfaces";
import ApiService from "../api";

class Auth {
  constructor(readonly basepath:string = "auth", readonly apiServiceObejct:ApiService = new ApiService("v1")) {  }

  loginUser = (bodyData: ILoginUserBodyData) => {
    return this.apiServiceObejct.post(`/${this.basepath}/login`, bodyData);
  } 
}

export default Auth;