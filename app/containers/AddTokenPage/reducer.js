/*
 *
 * AddTokenPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_TOKEN_NAME, ADD_TOKEN_SUCCESSED } from './constants';

export const initialState = {
  tokenName: '',
};

/* eslint-disable default-case, no-param-reassign */
const addTokenPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TOKEN_NAME:
        draft.tokenName = action.tokenName;
        break;
      case ADD_TOKEN_SUCCESSED:
        break;
    }
  });

export default addTokenPageReducer;
