/*
 *
 * DevicesPage actions
 *
 */

import {
  CHECK_DEVICE,
  CHECK_ALL_DEVICES,
  UNCHECK_ALL_DEVICES,
  FETCH_DEVICES,
  FETCH_DEVICES_SUCCESSED,
  FETCH_DEVICES_FAILED,
  APPROVE_DEVICE,
  APPROVE_DEVICE_SUCCESSED,
  APPROVE_DEVICE_FAILED,
  DELETE_DEVICE,
  DELETE_DEVICE_SUCCESSED,
  DELETE_DEVICE_FAILED,
} from './constants';

export function approveDevice(deviceId) {
  return {
    type: APPROVE_DEVICE,
    deviceId,
  };
}

export function approveDeviceSuccessed(device) {
  return {
    type: APPROVE_DEVICE_SUCCESSED,
    device,
  };
}

export function approveDeviceFailed(error) {
  return {
    type: APPROVE_DEVICE_FAILED,
    error,
  };
}

export function deleteDevice(deviceId) {
  return {
    type: DELETE_DEVICE,
    deviceId,
  };
}

export function deleteDeviceSuccessed(key) {
  return {
    type: DELETE_DEVICE_SUCCESSED,
    key,
  };
}

export function deleteDeviceFailed(error) {
  return {
    type: DELETE_DEVICE_FAILED,
    error,
  };
}

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

export function checkDevice(checkedList) {
  return {
    type: CHECK_DEVICE,
    checkedList,
  };
}

export function checkAllDevices(value) {
  if (value) {
    return {
      type: CHECK_ALL_DEVICES,
    };
  }
  return {
    type: UNCHECK_ALL_DEVICES,
  };
}
