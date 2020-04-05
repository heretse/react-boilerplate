/**
 *
 * AddTokenPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Input, Button } from 'antd';
import makeSelectAddTokenPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { addToken, changeTokenName } from './actions';

import CenteredSection from './CenteredSection';

export function AddTokenPage({
  // dispatch,
  addTokenPage,
  onChangeTokenName,
  onAddToken,
}) {
  useInjectReducer({ key: 'addTokenPage', reducer });
  useInjectSaga({ key: 'addTokenPage', saga });

  return (
    <div>
      <Helmet>
        <title>AddTokenPage</title>
        <meta name="description" content="Description of AddTokenPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <CenteredSection>
        <label htmlFor="token-name">
          <Input
            id="token-name"
            type="text"
            size="large"
            placeholder="Enter a token name"
            value={addTokenPage.tokenName}
            onChange={onChangeTokenName}
          />
          <Button type="primary" onClick={onAddToken}>
            Add
          </Button>
        </label>
      </CenteredSection>
    </div>
  );
}

AddTokenPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  addTokenPage: PropTypes.object.isRequired,
  onChangeTokenName: PropTypes.func.isRequired,
  onAddToken: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addTokenPage: makeSelectAddTokenPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    onChangeTokenName: evt => {
      dispatch(changeTokenName(evt.target.value));
    },
    onAddToken: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addToken());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddTokenPage);
