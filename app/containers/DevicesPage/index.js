/**
 *
 * DevicesPage
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Button, Skeleton, Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import {
  makeSelectLoading,
  // makeSelectError,
  makeSelectLoggedUser,
} from 'containers/App/selectors';
import makeSelectDevicesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { fetchDevices } from './actions';

const { Meta } = Card;

function generateCard(devices) {
  if (!devices) {
    return null;
  }
  if (!devices.length) {
    return <p>Sorry, the list is empty.</p>;
  }
  return (
    <div>
      {devices.map(device => (
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton loading={false} active>
            <Meta
              title={`${device.fromToken}`}
              description={`ID: ${device.machineId}`}
            />
            <p>
              Approved: {device.isApproved ? 'Yes' : 'No'}
              <br />
              Connected: {device.isConnected ? 'Yes' : 'No'}
              <br />
              Hostname: {device.hostname}
            </p>
          </Skeleton>
        </Card>
      ))}
    </div>
  );
}

export function DevicesPage({
  loading,
  // error,
  dispatch,
  loggedUser,
  devicesPage,
  onFetchDevices,
}) {
  useInjectReducer({ key: 'devicesPage', reducer });
  useInjectSaga({ key: 'devicesPage', saga });

  useEffect(() => {
    // When initial state logged user is not null, fetch the devices data
    if (loggedUser && loggedUser.token) {
      dispatch(fetchDevices());
    }
  }, []);

  return loggedUser === null ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Helmet>
        <title>DevicesPage</title>
        <meta name="description" content="Description of DevicesPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      &nbsp;
      {loading ? (
        <SyncOutlined spin />
      ) : (
        <Button
          shape="circle"
          onClick={onFetchDevices}
          icon={<SyncOutlined />}
        />
      )}
      {generateCard(devicesPage.devices)}
    </div>
  );
}

DevicesPage.propTypes = {
  loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  dispatch: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  devicesPage: PropTypes.object.isRequired,
  onFetchDevices: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  // error: makeSelectError(),
  loggedUser: makeSelectLoggedUser(),
  devicesPage: makeSelectDevicesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onFetchDevices: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchDevices());
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
)(DevicesPage);
