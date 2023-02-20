class LocalStorage {

  getLocalStorageItem = (key: string, isObject: boolean) => {
    const value = window.localStorage.getItem(key);

    return isObject && value ? JSON.parse(value) : value;
  }

  setLocalStorageItem = (key:string, value:any) => {
    if (typeof value === "object") {
      value = JSON.stringify(value)
    }

    return window.localStorage.setItem(key, value);
  }

  removeLocalStorageItem = (key: string) => {
    return window.localStorage.removeItem(key);
  }
}

export default LocalStorage;