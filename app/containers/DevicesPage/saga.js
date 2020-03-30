import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_DEVICES } from 'containers/DevicesPage/constants';
import { makeSelectLoggedUser } from 'containers/App/selectors';
import {
  fetchDevicesSuccessed,
  fetchDevicesFailed,
} from 'containers/DevicesPage/actions';

export function* callGetDevices() {
  const loggedUser = yield select(makeSelectLoggedUser());

  const requestURL = 'http://fleximanage.securepilot.com:3000/api/devices';

  try {
    const devices = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'same-origin',
    });

    yield put(fetchDevicesSuccessed(devices));
  } catch (err) {
    yield put(fetchDevicesFailed(err));
  }
}

// Individual exports for testing
export default function* getDevicesData() {
  yield takeLatest(FETCH_DEVICES, callGetDevices);
}
