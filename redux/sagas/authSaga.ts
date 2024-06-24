// sagas/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../reducers/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "@/constants/Constants";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  user: any;
  token: string;
}

function authenticateUser(credentials: LoginCredentials) {
  return axios.post<LoginResponse>(`${API_URL}/v1/auth/login`, credentials); // Replace with your API
}

function* handleLogin(action: PayloadAction<LoginCredentials>) {
  try {
    const response = yield call(authenticateUser, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
