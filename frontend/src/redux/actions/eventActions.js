import {
  EVENT_ALLDAY_CREATE_FAIL,
  EVENT_ALLDAY_CREATE_SUCCESS,
  EVENT_ALLDAY_LIST_FAIL,
  EVENT_ALLDAY_LIST_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstants";
import { LOADING_FALSE, LOADING_TRUE } from "../constants/loadingConstants";
import axiosConfig from "../../utils/axiosConfig";
import {
  createAllDayEventApi,
  createEventApi,
  deleteEventApi,
  getAllDayEventsApi,
  getAllEventsApi,
  getEventApi,
  updateEventApi,
} from "../../api/eventapis/EventApis";
import { errorHandler } from "../../utils/errors";

// Create Timed Event
export const createEvent =
  ({ startTime, endTime, name, location, allDay }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.post(createEventApi, {
        startTime,
        endTime,
        name,
        location,
        allDay,
      });

      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_CREATE_FAIL,
        payload: errorHandler(error),
      });
    }

    dispatch({
      type: LOADING_FALSE,
    });
  };

// Create All Day Event
export const createAllDayEvent =
  ({ name, location }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.post(createAllDayEventApi, {
        name,
        location,
      });

      dispatch({
        type: EVENT_ALLDAY_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EVENT_ALLDAY_CREATE_FAIL,
        payload: errorHandler(error),
      });
    }

    dispatch({
      type: LOADING_FALSE,
    });
  };

// Fetch Tmed Events
export const listEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getAllEventsApi);

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const listAllDayEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getAllDayEventsApi);

    dispatch({
      type: EVENT_ALLDAY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ALLDAY_LIST_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    await axiosConfig.delete(deleteEventApi(id));

    dispatch({
      type: EVENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DELETE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const updateEvent = (id, event) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.put(updateEventApi(id), event);

    dispatch({
      type: EVENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_UPDATE_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getEventApi(id));

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
