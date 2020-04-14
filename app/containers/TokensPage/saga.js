import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'connected-react-router';
import { FETCH_TOKENS, DELETE_TOKEN } from 'containers/TokensPage/constants';
import { makeSelectLoggedUser } from 'containers/App/selectors';
import makeSelectTokensPage from 'containers/TokensPage/selectors';
import {
  fetchTokensSuccessed,
  fetchTokensFailed,
  deleteTokenSuccessed,
} from 'containers/TokensPage/actions';

export function* callGetTokens() {
  const loggedUser = yield select(makeSelectLoggedUser());

  const requestURL = 'http://fleximanage.securepilot.com:3000/api/tokens';

  try {
    const tokens = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'same-origin',
    });

    yield put(fetchTokensSuccessed(tokens));
  } catch (err) {
    yield put(fetchTokensFailed(err));
  }
}

export function* callDeleteToken() {
  const loggedUser = yield select(makeSelectLoggedUser());

  const tokensPage = yield select(makeSelectTokensPage());

  const requestURL = 'http://fleximanage.securepilot.com:3000/api/tokens';

  try {
    const body = yield call(
      request,
      `${requestURL}/${tokensPage.selectedRowKeys[0]}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'same-origin',
      },
    );

    /* eslint no-underscore-dangle: 0 */
    yield put(deleteTokenSuccessed(body._id));
    yield put(push('/tokens'));
  } catch (err) {
    // yield put(fetchTokensFailed(err));
  }
}

// Individual exports for testing
export default function* tokensPageSaga() {
  yield takeLatest(FETCH_TOKENS, callGetTokens);
  yield takeLatest(DELETE_TOKEN, callDeleteToken);
}
