/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  START_LOGIN,
  START_LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  loggedUser: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case START_LOGIN:
        draft.loading = true;
        draft.error = false;
        break;

      case START_LOGOUT:
        draft.loading = false;
        draft.error = false;
        draft.loggedUser = null;
        break;

      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.loggedUser = {
          username: action.username,
          name: action.body.name,
          token: action.body.token,
          refreshToken: action.body.refreshToken,
        };
        break;
      case LOGIN_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
