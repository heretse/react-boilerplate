/*
 *
 * TokensPage actions
 *
 */

import {
  FETCH_TOKENS,
  FETCH_TOKENS_FAILED,
  FETCH_TOKENS_SUCCESSED,
  SET_SELECTED_ROW_KEYS,
  DELETE_TOKEN,
  DELETE_TOKEN_SUCCESSED,
} from './constants';

export function fetchTokens() {
  return {
    type: FETCH_TOKENS,
  };
}

export function fetchTokensSuccessed(tokens) {
  return {
    type: FETCH_TOKENS_SUCCESSED,
    tokens,
  };
}

export function fetchTokensFailed(error) {
  return {
    type: FETCH_TOKENS_FAILED,
    error,
  };
}

export function setSelectedRowKeys(selectedRowKeys) {
  return {
    type: SET_SELECTED_ROW_KEYS,
    selectedRowKeys,
  };
}

export function deleteToken() {
  return {
    type: DELETE_TOKEN,
  };
}

export function deleteTokenSuccessed(key) {
  return {
    type: DELETE_TOKEN_SUCCESSED,
    key,
  };
}
