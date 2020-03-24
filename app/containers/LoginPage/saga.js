import { call, put, select, takeLatest } from 'redux-saga/effects';

import { START_LOGIN } from 'containers/App/constants';
import { loginSuccessed, loginFailed } from 'containers/App/actions';

import request from 'utils/request';
import {
  makeSelectUsername,
  makeSelectPassword,
} from 'containers/LoginPage/selectors';

export function* doLogin() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());

  const requestURL = 'http://fleximanage.securepilot.com:3000/api/users/login';

  try {
    // Call our request helper (see 'utils/request')
    const body = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      mode: 'cors',
      credentials: 'same-origin',
    });
    yield put(loginSuccessed(body, username));
  } catch (err) {
    yield put(loginFailed(err));
  }
}

export default function* startLoginProcess() {
  yield takeLatest(START_LOGIN, doLogin);
}
