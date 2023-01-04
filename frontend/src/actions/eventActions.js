import axios from "axios";
import {
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
} from "../constants/eventConstants";

export const createEvent =
  ({ startTime, endTime, name, location }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        cookies: {
          jwt: `${userInfo}`,
        },
      };

      // passing second Argument an Empty Object, as we are not passing data here
      const { data } = await axios.post(
        `/api/events`,
        { startTime, endTime, name, location },
        config
      );

      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
