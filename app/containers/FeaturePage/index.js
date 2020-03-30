/*
 * FeaturePage
 *
 * List all the features
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { makeSelectLoggedUser } from 'containers/App/selectors';

import H1 from 'components/H1';
import H2 from 'components/H2';
import { NumberOutlined } from '@ant-design/icons';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';

export function FeaturePage({ loggedUser }) {
  return loggedUser === null ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <H2>Create your network in few simple steps:</H2>
      <List>
        <ListItem>
          <H2>
            <NumberOutlined />
            On your router device:
          </H2>
          <ListItemTitle>
            {/* <FormattedMessage {...messages.scaffoldingHeader} /> */}
            <p>
              1. Install the flexiWAN device software on your Ubuntu 18.04 LTS
              device. Execute as root:
            </p>
          </ListItemTitle>
          <p>
            {/* <FormattedMessage {...messages.scaffoldingMessage} /> */}$ curl
            -sL https://deb.flexiwan.com/setup | bash -<br />$ apt-get install
            flexiwan-router
          </p>
        </ListItem>

        <ListItem>
          <H2>
            <NumberOutlined />
            On your management account:
          </H2>

          <ListItemTitle>
            {/* <FormattedMessage {...messages.feedbackHeader} /> */}
            <p>
              2. Create your organization token in the Inventory → Tokens menu
              Copy your organization token into the device file:
            </p>
          </ListItemTitle>
          <p>
            {/* <FormattedMessage {...messages.feedbackMessage} /> */}$
            /etc/flexiwan/agent/token.txt
          </p>
          {/* </ListItem>

        <ListItem> */}
          <ListItemTitle>
            <p>
              {/* <FormattedMessage {...messages.routingHeader} /> */}
              3. You should see your device in the Inventory → Devices menu
              Click on the device name, approve it and verify the interface
              configuration Click on the &quot;Update Device&quot; button and
              you&#39;re ready to go
            </p>
          </ListItemTitle>
          {/* <p>
            <FormattedMessage {...messages.routingMessage} />
          </p> */}
          {/* </ListItem>

        <ListItem> */}
          <ListItemTitle>
            {/* <FormattedMessage {...messages.networkHeader} /> */}
            {
              <p>
                4. After your device is approved and connected, you can start it
                and create secure tunnels to your other sites
              </p>
            }
          </ListItemTitle>
          {/* <p>
            <FormattedMessage {...messages.networkMessage} />
          </p> */}
        </ListItem>

        {/* <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.intlHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.intlMessage} />
          </p>
        </ListItem> */}
      </List>
    </div>
  );
}

FeaturePage.propTypes = {
  loggedUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loggedUser: makeSelectLoggedUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FeaturePage);
