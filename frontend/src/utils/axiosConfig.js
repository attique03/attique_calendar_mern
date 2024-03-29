import axios from "axios";
import { getLocalStorage } from "./localStorage";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

const userInfoFromStorage = getLocalStorage("userInfo")
  ? JSON.parse(getLocalStorage("userInfo"))
  : null;

if (userInfoFromStorage) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userInfoFromStorage.token}`;
}
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
