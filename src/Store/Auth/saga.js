import axios from "../../Routes/AxiosConfig";
import { fork, put, all, takeLatest } from "redux-saga/effects";
// Login Redux States
import {
  LOGIN,
  REGISTER_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "./actionTypes";
import { loginSuccess, registerUserSuccessful } from "./actions";
import { push } from "connected-react-router";
import { sagaErrorHandler } from "../../Shared/HelperMethods/SagaErrorHandler";

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload }) {
  try {
    let data = {
      email: payload.email,
      password: payload.password,
    };
    const response = yield axios.post("auth/login", data);
    yield put(loginSuccess(response.data));
    yield put(push("/dashboard"));
  } catch (error) {
    yield sagaErrorHandler(error.response);
  }
}

function* registerUser({ payload }) {
  try {
    let data = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };
    const response = yield axios.post("auth/register", data);
    yield put(registerUserSuccessful(response.data));
    yield put(push("/dashboard"));
  } catch (error) {
    yield sagaErrorHandler(error.response);
  }
}

function* forgotPasswordRequest({ payload }) {
  try {
    let data = {
      email: payload.email,
    };
    yield axios.post("auth/admin/forgot-password", data);
  } catch (error) {
    yield sagaErrorHandler(error.response);
  }
}

function* resetPasswordRequest({ payload }) {
  try {
    let data = {
      email: payload.email,
      passwordResetToken: payload.passwordResetToken,
      password: payload.password,
    };
    yield axios.post("auth/admin/reset-password", data);
  } catch (error) {
    yield sagaErrorHandler(error.response);
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, loginUser);
}
export function* watchRegister() {
  yield takeLatest(REGISTER_USER, registerUser);
}
export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordRequest);
}
export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD, resetPasswordRequest);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchRegister),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
