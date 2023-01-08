import {
  EVENT_ALLDAY_CREATE_FAIL,
  EVENT_ALLDAY_CREATE_REQUEST,
  EVENT_ALLDAY_CREATE_RESET,
  EVENT_ALLDAY_CREATE_SUCCESS,
  EVENT_ALLDAY_LIST_FAIL,
  EVENT_ALLDAY_LIST_REQUEST,
  EVENT_ALLDAY_LIST_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_RESET,
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
  EVENT_UPDATE_RESET,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstants";

export const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const eventAllDayCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_ALLDAY_CREATE_REQUEST:
      return { loading: true };
    case EVENT_ALLDAY_CREATE_SUCCESS:
      return { loading: false, success: true, eventAllDay: action.payload };
    case EVENT_ALLDAY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_ALLDAY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const eventListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return { loading: true };
    case EVENT_LIST_SUCCESS:
      return { loading: false, events: action.payload };
    case EVENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventAllDayListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case EVENT_ALLDAY_LIST_REQUEST:
      return { loading: true };
    case EVENT_ALLDAY_LIST_SUCCESS:
      return { loading: false, eventsAllDay: action.payload };
    case EVENT_ALLDAY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload };
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const eventUpdateReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_UPDATE_REQUEST:
      return { loading: true };
    case EVENT_UPDATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_UPDATE_RESET:
      return {
        event: {},
      };
    default:
      return state;
  }
};
