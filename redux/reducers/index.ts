// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Create this file next

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
