import { addToken } from '../actions';
import { ADD_TOKEN } from '../constants';

describe('AddTokenPage actions', () => {
  describe('Add Token Action', () => {
    it('has a type of ADD_TOKEN', () => {
      const expected = {
        type: ADD_TOKEN,
      };
      expect(addToken()).toEqual(expected);
    });
  });
});
