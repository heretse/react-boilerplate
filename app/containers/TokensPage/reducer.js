/*
 *
 * TokensPage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_TOKENS,
  FETCH_TOKENS_SUCCESSED,
  SET_SELECTED_ROW_KEYS,
  DELETE_TOKEN_SUCCESSED,
} from './constants';

export const initialState = {
  tokens: [],
  selectedRowKeys: [],
};

/* eslint-disable default-case, no-param-reassign */
const tokensPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_TOKENS:
        draft.tokens = [];
        break;
      case FETCH_TOKENS_SUCCESSED:
        draft.tokens = action.tokens.map(item => ({
          key: item.get('_id'),
          name: item.name,
          token: item.token,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));
        break;
      case SET_SELECTED_ROW_KEYS:
        draft.selectedRowKeys = action.selectedRowKeys;
        break;
      case DELETE_TOKEN_SUCCESSED:
        draft.selectedRowKeys = [];
        draft.tokens = state.tokens.filter(token => token.key !== action.key);
        break;
    }
  });

export default tokensPageReducer;
