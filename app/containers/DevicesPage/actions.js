/*
 *
 * DevicesPage actions
 *
 */

import {
  FETCH_DEVICES,
  FETCH_DEVICES_SUCCESSED,
  FETCH_DEVICES_FAILED,
} from './constants';

export function fetchDevices() {
  return {
    type: FETCH_DEVICES,
  };
}

export function fetchDevicesSuccessed(devices) {
  return {
    type: FETCH_DEVICES_SUCCESSED,
    devices,
  };
}

export function fetchDevicesFailed(error) {
  return {
    type: FETCH_DEVICES_FAILED,
    error,
  };
}
