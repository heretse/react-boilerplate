import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { ADD_TOKEN } from 'containers/AddTokenPage/constants';
import { makeSelectLoggedUser } from 'containers/App/selectors';
import makeSelectAddTokenPage from 'containers/AddTokenPage/selectors';
import {
  addTokenSuccessed,
  addTokenFailed,
} from 'containers/AddTokenPage/actions';

export function* callAddToken() {
  const loggedUser = yield select(makeSelectLoggedUser());
  const addTokenPage = yield select(makeSelectAddTokenPage());

  const requestURL = 'http://fleximanage.securepilot.com:3000/api/tokens';

  try {
    const body = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: addTokenPage.tokenName,
      }),
      mode: 'cors',
      credentials: 'same-origin',
    });

    yield put(addTokenSuccessed(body));
    yield put(push('/tokens'));
  } catch (err) {
    yield put(addTokenFailed(err));
  }
}

// Individual exports for testing
export default function* addTokenPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ADD_TOKEN, callAddToken);
}
