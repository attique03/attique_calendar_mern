import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";
import axiosConfig from "../../utils/axiosConfig";
import { LOADING_FALSE, LOADING_TRUE } from "../constants/loadingConstants";
import { loginApi, registerApi } from "../../api/userapis/UserApis";
import {
  EVENT_ALLDAY_LIST_RESET,
  EVENT_LIST_RESET,
} from "../constants/eventConstants";
import { errorHandler } from "../../utils/errorHandler";
import { removeLocalStorage, setLocalStorage } from "../../utils/localStorage";

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(registerApi, {
      email,
      password,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOADING_FALSE,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    setLocalStorage("userInfo", data);

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(loginApi, {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    setLocalStorage("userInfo", data);
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const logout = () => (dispatch) => {
  // localStorage.removeItem("userInfo");
  removeLocalStorage("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: EVENT_LIST_RESET });
  dispatch({ type: EVENT_ALLDAY_LIST_RESET });
};
