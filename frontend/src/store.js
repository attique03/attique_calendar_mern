import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import { eventCreateReducer } from "./reducers/eventReducers";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userLogout: userLogoutReducer,
  eventCreate: eventCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  //   cart: {
  //     cartItems: cartItemsFromStorage,
  //     shippingAddress: shippingAddressFromStorage,
  //   },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
