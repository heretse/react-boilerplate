/*
 *
 * DevicesPage reducer
 *
 */
import produce from 'immer';
import { FETCH_DEVICES_SUCCESSED } from './constants';

export const initialState = {
  devices: [],
};

/* eslint-disable default-case, no-param-reassign */
const devicesPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_DEVICES_SUCCESSED:
        draft.devices = action.devices;
        break;
    }
  });

export default devicesPageReducer;
