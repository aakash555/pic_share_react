import axios from "axios";
import { apiServiceUrl } from "../config";
import { IJsonObject } from "../interfaces";

class ApiService {
  constructor(public service:string="", readonly apiUrl:string = apiServiceUrl) {

  }

  get = (url: string, query = {}) => {
    let urlParams = query ? "?" + new URLSearchParams(query).toString() : "";
    let Url_set =
      this.apiUrl +
      (this.service ? "/" + this.service : "") +
      url +
      urlParams;
    return new window.Promise((resolve, reject) => {
      axios({
        url: Url_set,
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        }
      }).then(
        (data: IJsonObject) => {
          if (data.status == 200) {
            resolve(data.data);
          } else {
            reject(data);
          }
        },
        (e: any) => {
          reject(e);
        }
      );
    });
  };

  post = (url: string, body: IJsonObject, query = {}) => {
    let urlParams = query ? "?" + new URLSearchParams(query).toString() : "";
    let Url_set =
      this.apiUrl +
      (this.service ? "/" + this.service : "") +
      url +
      urlParams;
    return new window.Promise((resolve, reject) => {
      axios({
        url: Url_set,
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        data: body,
      }).then(
        (data: IJsonObject) => {
          if (data.status == 200) {
            resolve(data.data);
          } else {
            reject(data);
          }
        },
        (e: any) => {
          reject(e);
        }
      );
    });
  };

  put = (url: string, body = {}, query = {}) => {
    let urlParams = query ? "?" + new URLSearchParams(query).toString() : "";
    let Url_set =
      this.apiUrl +
      (this.service ? "/" + this.service : "") +
      url +
      urlParams;
    return new window.Promise((resolve, reject) => {
      axios({
        url: Url_set,
        method: "put",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json"
        },
        withCredentials: true,
        data: body,
      }).then(
        (data: IJsonObject) => {
          if (data.status == 200) {
            resolve(data.data);
          } else {
            reject(data);
          }
        },
        (e: any) => {
          reject(e);
        }
      );
    });
  };
}


export default ApiService;
