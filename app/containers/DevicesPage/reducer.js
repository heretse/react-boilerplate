/*
 *
 * DevicesPage reducer
 *
 */
import produce from 'immer';
import {
  APPROVE_DEVICE_SUCCESSED,
  DELETE_DEVICE_SUCCESSED,
  CHECK_DEVICE,
  CHECK_ALL_DEVICES,
  UNCHECK_ALL_DEVICES,
  FETCH_DEVICES,
  FETCH_DEVICES_SUCCESSED,
} from './constants';

export const initialState = {
  devices: [],
};

/* eslint-disable default-case, no-param-reassign */
const devicesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case APPROVE_DEVICE_SUCCESSED:
        draft.checkAll = false;
        draft.checkedList = [];
        /* eslint no-underscore-dangle: 0 */
        draft.devices = state.devices.map(device =>
          action.device._id === device._id ? action.device : device,
        );
        break;
      case DELETE_DEVICE_SUCCESSED:
        draft.checkAll = false;
        draft.checkedList = [];
        draft.devices = state.devices.filter(
          device => device.key !== action.key,
        );
        break;
      case FETCH_DEVICES:
        draft.devices = [];
        break;
      case FETCH_DEVICES_SUCCESSED:
        draft.devices = action.devices;
        break;
      case CHECK_DEVICE:
        draft.checkAll = action.checkedList.length === state.devices.length;
        draft.checkedList = action.checkedList;
        break;
      case CHECK_ALL_DEVICES:
        draft.checkAll = true;
        /* eslint no-underscore-dangle: 0 */
        draft.checkedList = state.devices.map(device => device._id);
        break;
      case UNCHECK_ALL_DEVICES:
        draft.checkAll = false;
        draft.checkedList = [];
        break;
    }
  });

export default devicesPageReducer;
