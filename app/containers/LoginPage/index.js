/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectLoggedUser,
} from 'containers/App/selectors';
import H2 from 'components/H2';

import { Input, Button } from 'antd';
import { SyncOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import { startLogin } from '../App/actions';
import { changeUsername, changePassword } from './actions';
import { makeSelectUsername, makeSelectPassword } from './selectors';

import CenteredSection from './CenteredSection';
import Form from './Form';
// import Input from './Input';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function showLoading(loading) {
  if (loading) return <SyncOutlined spin />;
  return <></>;
}

export function LoginPage({
  loggedUser,
  username,
  password,
  loading,
  // error,
  onSubmitForm,
  onChangeUsername,
  onChangePassword,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  return loggedUser != null ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <CenteredSection>
        <H2>
          <FormattedMessage {...messages.header} />
          {showLoading(loading)}
        </H2>
        <Form onSubmit={onSubmitForm}>
          <label htmlFor="username">
            <Input
              id="username"
              type="text"
              size="large"
              placeholder="Enter your username"
              value={username}
              prefix={<UserOutlined />}
              onChange={onChangeUsername}
            />
          </label>
          &nbsp;
          <label htmlFor="password">
            <Input.Password
              id="password"
              type="password"
              size="large"
              placeholder="Enter your password"
              value={password}
              prefix={<KeyOutlined />}
              onChange={onChangePassword}
            />
          </label>
          <br />
          <label htmlFor="action">
            <Button type="submit" onClick={onSubmitForm}>
              Login
            </Button>
            &nbsp;
            <Button type="reset">Reset</Button>
          </label>
        </Form>
      </CenteredSection>
    </div>
  );
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedUser: PropTypes.object,
  username: PropTypes.string,
  password: PropTypes.string,
  onSubmitForm: PropTypes.func,
  onChangeUsername: PropTypes.func,
  onChangePassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedUser: makeSelectLoggedUser(),
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(startLogin());
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
)(LoginPage);
