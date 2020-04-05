import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addTokenPage state domain
 */

const selectAddTokenPageDomain = state => state.addTokenPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddTokenPage
 */

const makeSelectAddTokenPage = () =>
  createSelector(
    selectAddTokenPageDomain,
    substate => substate,
  );

export default makeSelectAddTokenPage;
export { selectAddTokenPageDomain };
