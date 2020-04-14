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
import A from 'components/A';
import { Button, Skeleton, Card, Checkbox, Menu, Dropdown } from 'antd';
import {
  CheckCircleOutlined,
  DownOutlined,
  DeleteOutlined,
  EditOutlined,
  // StopOutlined,
  SyncOutlined,
  // PlayCircleOutlined,
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

import {
  approveDevice,
  checkAllDevices,
  checkDevice,
  deleteDevice,
  fetchDevices,
} from './actions';

const { Meta } = Card;

function generateCard(state, dispatch) {
  const { checkedList } = state;
  const { devices } = state;

  if (!devices) {
    return null;
  }
  if (!devices.length) {
    return <p>Sorry, the list is empty.</p>;
  }

  /* eslint no-underscore-dangle: 0 */
  return (
    <Checkbox.Group
      value={checkedList}
      onChange={list => {
        dispatch(checkDevice(list));
      }}
    >
      {devices.map(device => (
        <Card
          style={{ width: 300, marginTop: 16 }}
          actions={[
            <CheckCircleOutlined
              onClick={() => dispatch(approveDevice(device._id))}
            />,
            // <PlayCircleOutlined />,
            // <StopOutlined />,
            <DeleteOutlined
              onClick={() => dispatch(deleteDevice(device._id))}
            />,
            <EditOutlined key="edit" />,
          ]}
        >
          <Checkbox value={device._id} />
          <Skeleton loading={false} active>
            <Meta
              title={`${device.fromToken}`}
              description={`ID: ${device.machineId}`}
            />
            <p>
              {device.isApproved ? (
                <Button type="primary">Approved</Button>
              ) : (
                <Button type="danger">Not Approved</Button>
              )}
              <br />
              {device.isConnected ? (
                <Button type="primary">Connected</Button>
              ) : (
                <Button type="danger">Not Connected</Button>
              )}
              <br />
              Hostname: {device.hostname}
            </p>
          </Skeleton>
        </Card>
      ))}
    </Checkbox.Group>
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

  const onMenuClick = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  return loggedUser === null ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Helmet>
        <title>DevicesPage</title>
        <meta name="description" content="Description of DevicesPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <br />
      <Checkbox
        all
        checked={devicesPage.checkAll}
        onChange={e => {
          dispatch(checkAllDevices(e.target.checked));
        }}
      >
        Select All
      </Checkbox>
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
      &nbsp;
      <Dropdown
        overlay={
          <Menu onClick={onMenuClick}>
            <Menu.Item key="0" disabled>
              Device Operations
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">Create Tunnels</Menu.Item>
            <Menu.Item key="2">Upgrade Device</Menu.Item>
            <Menu.Item key="2">Schedule Device Upgrade</Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <A
          className="ant-dropdown-link"
          onClick={e => e.preventDefault()}
          onKeyDown={() => {}}
        >
          Actions <DownOutlined />
        </A>
      </Dropdown>
      <br />
      {generateCard(devicesPage, dispatch)}
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
