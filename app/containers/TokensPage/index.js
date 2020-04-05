/**
 *
 * TokensPage
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  // makeSelectLoading,
  // makeSelectError,
  makeSelectLoggedUser,
} from 'containers/App/selectors';
import { Button, Table } from 'antd';
import { fetchTokens, setSelectedRowKeys, deleteToken } from './actions';

import makeSelectTokensPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function TokensPage({
  dispatch,
  tokensPage,
  loggedUser,
  onAddToken,
  onDeleteToken,
}) {
  useInjectReducer({ key: 'tokensPage', reducer });
  useInjectSaga({ key: 'tokensPage', saga });

  useEffect(() => {
    // When initial state logged user is not null, fetch the devices data
    if (loggedUser && loggedUser.token) {
      dispatch(fetchTokens());
    }
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const rowSelection = {
    selectedRowKeys: tokensPage.selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        ' selectedRows: ',
        selectedRows,
      );
      dispatch(setSelectedRowKeys(selectedRowKeys));
    },
  };

  return loggedUser === null ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Helmet>
        <title>TokensPage</title>
        <meta name="description" content="Description of TokensPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      &nbsp;
      <Button type="primary" shape="round" size="medium" onClick={onAddToken}>
        New Token
      </Button>
      &nbsp;
      <Button
        type="primary"
        shape="round"
        size="medium"
        onClick={onDeleteToken}
      >
        Delete Token
      </Button>
      <br />
      <Table
        rowSelection={{ type: 'radio', ...rowSelection }}
        dataSource={tokensPage.tokens}
        columns={columns}
      />
    </div>
  );
}

TokensPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tokensPage: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
  onAddToken: PropTypes.func.isRequired,
  onDeleteToken: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tokensPage: makeSelectTokensPage(),
  loggedUser: makeSelectLoggedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAddToken: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(push('/addToken'));
    },
    onDeleteToken: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(deleteToken());
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
)(TokensPage);
