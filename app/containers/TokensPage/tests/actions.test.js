import { fetchTokens } from '../actions';
import { FETCH_TOKENS } from '../constants';

describe('TokensPage actions', () => {
  describe('Fetch Tokens Action', () => {
    it('has a type of FETCH_TOKENS', () => {
      const expected = {
        type: FETCH_TOKENS,
      };
      expect(fetchTokens()).toEqual(expected);
    });
  });
});
