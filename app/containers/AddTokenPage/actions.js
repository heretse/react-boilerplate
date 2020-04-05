/*
 *
 * AddTokenPage actions
 *
 */

import {
  CHANGE_TOKEN_NAME,
  ADD_TOKEN,
  ADD_TOKEN_SUCCESSED,
  ADD_TOKEN_FAILED,
} from './constants';

export function changeTokenName(tokenName) {
  return {
    type: CHANGE_TOKEN_NAME,
    tokenName,
  };
}

export function addToken() {
  return {
    type: ADD_TOKEN,
  };
}

export function addTokenSuccessed(body) {
  return {
    type: ADD_TOKEN_SUCCESSED,
    body,
  };
}

export function addTokenFailed(error) {
  return {
    type: ADD_TOKEN_FAILED,
    error,
  };
}
