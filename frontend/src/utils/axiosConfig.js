import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

if (userInfoFromStorage) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userInfoFromStorage.token}`;
}
instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
