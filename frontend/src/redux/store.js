import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  eventAllDayListReducer,
  eventCreateReducer,
  eventDeleteReducer,
  eventDetailsReducer,
  eventListReducer,
  eventUpdateReducer,
} from "./reducers/eventReducers";
import { loadingReducer } from "./reducers/loadingReducers";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  eventCreate: eventCreateReducer,
  eventList: eventListReducer,
  eventAllDayList: eventAllDayListReducer,
  eventDetails: eventDetailsReducer,
  eventDelete: eventDeleteReducer,
  eventUpdate: eventUpdateReducer,
  loading: loadingReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
