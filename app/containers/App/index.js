/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
// import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import DevicesPage from 'containers/DevicesPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TokensPage from 'containers/TokensPage/Loadable';
import AddTokenPage from 'containers/AddTokenPage/Loadable';

// ant-design
import 'antd/dist/antd.css';
import './index.css';

import { Layout, Menu } from 'antd';
import {
  AreaChartOutlined,
  ApartmentOutlined,
  HomeOutlined,
  InfoOutlined,
  MonitorOutlined,
  UserOutlined,
} from '@ant-design/icons';
import GlobalStyle from '../../global-styles';
const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export default function App() {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          <Menu.Item key="0">
            <HomeOutlined />
            <span className="nav-text">
              <Link to="/">Home</Link>
            </span>
          </Menu.Item>

          <Menu.Item key="1">
            <UserOutlined />
            <span className="nav-text">Users</span>
          </Menu.Item>

          <SubMenu
            key="2"
            title={
              <span>
                <ApartmentOutlined />
                <span>Inventory</span>
              </span>
            }
          >
            <Menu.Item key="2.1">
              <span className="nav-text">
                <Link to="/devices">Devices</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="2.2">
              <span className="nav-text">Tunnels</span>
            </Menu.Item>
            <Menu.Item key="2.3">
              <span className="nav-text">
                <Link to="/tokens">Tokens</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="2.4">
              <span className="nav-text">Path Labels</span>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="3"
            title={
              <span>
                <AreaChartOutlined />
                <span>Dashboard</span>
              </span>
            }
          >
            <Menu.Item key="3.1">
              <span className="nav-text">Network</span>
            </Menu.Item>
            <Menu.Item key="3.2">
              <span className="nav-text">Traffic</span>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="4"
            title={
              <span>
                <MonitorOutlined />
                <span>Troubleshoot</span>
              </span>
            }
          >
            <Menu.Item key="4.1">
              <span className="nav-text">Jobs</span>
            </Menu.Item>
            <Menu.Item key="4.2">
              <span className="nav-text">Notifications</span>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="5">
            <InfoOutlined />
            <span className="nav-text">About</span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route exact path="/" component={FeaturePage} />
              <Route path="/devices" component={DevicesPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/repos" component={HomePage} />
              <Route path="/tokens" component={TokensPage} />
              <Route path="/addToken" component={AddTokenPage} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Gemtek Technology Co., Ltd. ©2020
        </Footer>
      </Layout>
      <GlobalStyle />
    </Layout>
  );
}
