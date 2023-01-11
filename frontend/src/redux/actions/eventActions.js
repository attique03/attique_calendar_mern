import axios from "axios";
import {
  EVENT_ALLDAY_CREATE_FAIL,
  EVENT_ALLDAY_CREATE_REQUEST,
  EVENT_ALLDAY_CREATE_SUCCESS,
  EVENT_ALLDAY_LIST_FAIL,
  EVENT_ALLDAY_LIST_REQUEST,
  EVENT_ALLDAY_LIST_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstants";

// Create Timed Event
export const createEvent =
  ({ startTime, endTime, name, location, allDay }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };

      const { data } = await axios.post(
        "/api/events",
        { startTime, endTime, name, location, allDay },
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
          error.response && error.response.data
            ? error.response.data.error
            : error.message,
      });
    }
  };

// Create All Day Event
export const createAllDayEvent =
  ({ name, location }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EVENT_ALLDAY_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo}`,
        },
      };

      const { data } = await axios.post(
        "/api/events/createAllDay",
        { name, location },
        config
      );

      dispatch({
        type: EVENT_ALLDAY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_ALLDAY_CREATE_FAIL,
        payload:
          error.response && error.response.data
            ? error.response.data.error
            : error.message,
      });
    }
  };

// Fetch Tmed Events
export const listEvents = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.get("/api/events/allevents", config);

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllDayEvents = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_ALLDAY_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.get("/api/events/allDayEvents", config);

    dispatch({
      type: EVENT_ALLDAY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ALLDAY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    await axios.delete(`/api/events/delete/${id}`, config);

    dispatch({
      type: EVENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateEvent = (id, event) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.put(`/api/events/update/${id}`, event, config);

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };

    const { data } = await axios.get(`/api/events/getEvent/${id}`, config);

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
