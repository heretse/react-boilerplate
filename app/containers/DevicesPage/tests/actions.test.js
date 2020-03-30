import { fetchDevices } from '../actions';
import { FETCH_DEVICES } from '../constants';

describe('DevicesPage actions', () => {
  describe('Fetch Devices Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: FETCH_DEVICES,
      };
      expect(fetchDevices()).toEqual(expected);
    });
  });
});
