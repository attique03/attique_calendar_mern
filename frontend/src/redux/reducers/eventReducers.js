import {
  EVENT_ALLDAY_LIST_FAIL,
  EVENT_ALLDAY_LIST_RESET,
  EVENT_ALLDAY_LIST_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_RESET,
  EVENT_CREATE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_DELETE_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DETAILS_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_LIST_RESET,
  EVENT_LIST_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_UPDATE_RESET,
  EVENT_UPDATE_SUCCESS,
} from "../constants/eventConstants";

export const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_SUCCESS:
      return { success: true, event: action.payload };
    case EVENT_CREATE_FAIL:
      return { error: action.payload };
    case EVENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const eventListReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_LIST_SUCCESS:
      return { events: action.payload };
    case EVENT_LIST_FAIL:
      return { error: action.payload };
    case EVENT_LIST_RESET:
      return { events: [] };
    default:
      return state;
  }
};

export const eventAllDayListReducer = (
  state = { eventsAllDay: [] },
  action
) => {
  switch (action.type) {
    case EVENT_ALLDAY_LIST_SUCCESS:
      return { eventsAllDay: action.payload };
    case EVENT_ALLDAY_LIST_FAIL:
      return { error: action.payload };
    case EVENT_ALLDAY_LIST_RESET:
      return { eventsAllDay: [] };
    default:
      return state;
  }
};

export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_SUCCESS:
      return { event: action.payload };
    case EVENT_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_SUCCESS:
      return { success: true };
    case EVENT_DELETE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
export const eventUpdateReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_UPDATE_SUCCESS:
      return { success: true, event: action.payload };
    case EVENT_UPDATE_FAIL:
      return { error: action.payload };
    case EVENT_UPDATE_RESET:
      return {
        event: {},
      };
    default:
      return state;
  }
};
