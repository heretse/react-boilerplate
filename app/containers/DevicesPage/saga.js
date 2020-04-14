import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  FETCH_DEVICES,
  APPROVE_DEVICE,
  DELETE_DEVICE,
} from 'containers/DevicesPage/constants';
import { makeSelectLoggedUser } from 'containers/App/selectors';
import {
  approveDeviceSuccessed,
  approveDeviceFailed,
  deleteDeviceSuccessed,
  deleteDeviceFailed,
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

export function* callApproveDevice(action) {
  const loggedUser = yield select(makeSelectLoggedUser());

  const requestURL = `http://fleximanage.securepilot.com:3000/api/devices/${
    action.deviceId
  }`;

  try {
    const device = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isApproved: true,
      }),
      mode: 'cors',
      credentials: 'same-origin',
    });

    yield put(approveDeviceSuccessed(device));
  } catch (err) {
    yield put(approveDeviceFailed(err));
  }
}

export function* callDeleteDevice(action) {
  const loggedUser = yield select(makeSelectLoggedUser());

  const requestURL = `http://fleximanage.securepilot.com:3000/api/devices/${
    action.deviceId
  }`;

  try {
    const body = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'same-origin',
    });

    /* eslint no-underscore-dangle: 0 */
    yield put(deleteDeviceSuccessed(body._id));
  } catch (err) {
    yield put(deleteDeviceFailed(err));
  }
}

// Individual exports for testing
export default function* getDevicesData() {
  yield takeLatest(FETCH_DEVICES, callGetDevices);
  yield takeLatest(APPROVE_DEVICE, callApproveDevice);
  yield takeLatest(DELETE_DEVICE, callDeleteDevice);
}
