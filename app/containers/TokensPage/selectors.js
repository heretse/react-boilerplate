import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tokensPage state domain
 */

const selectTokensPageDomain = state => state.tokensPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TokensPage
 */

const makeSelectTokensPage = () =>
  createSelector(
    selectTokensPageDomain,
    substate => substate,
  );

export default makeSelectTokensPage;
export { selectTokensPageDomain };
