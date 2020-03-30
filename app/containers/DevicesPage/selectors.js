import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the devicesPage state domain
 */

const selectDevicesPageDomain = state => state.devicesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DevicesPage
 */

const makeSelectDevicesPage = () =>
  createSelector(
    selectDevicesPageDomain,
    substate => substate,
  );

export default makeSelectDevicesPage;
export { selectDevicesPageDomain };
