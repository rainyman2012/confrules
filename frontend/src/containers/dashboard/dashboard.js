import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect, Route } from "react-router-dom";
// import { getUserDetail } from "../store/actions/auth";
import { Row, Col, Spin } from "antd";
import { Layout, Menu, Icon } from "antd";
import Form from "./DashForm";
import Card from "./FormCard";
import { Lang as T } from "../../languages";
import "../../stylesheets/dashboard.css";
const { Header, Sider, Content } = Layout;

class Dashboard extends Component {
  state = {
    access: {
      general: true,
      marriage: false
    },
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentWillMount(nextProps, nextState) {
    console.log("im in update");

    if (this.props.token) {
      console.log("this token", this.props.token);

      // this.props.getUserDetail(this.props.token);
    }
  }

  handleGetSurvey = e => {
    this.props.getSurvey();
  };

  handlePostSurvey = e => {
    this.props.setSurvey("Ehsan");
  };

  componentSwitcher(param) {
    switch (param) {
      case "form":
        return <Form />;
      case "card":
        return <Card />;
      default:
        return "Home";
    }
  }
  render() {
    if (this.props.loading) {
      return <Spin />;
    }

    // if (!this.props.token || !this.props.user) {
    //   return <Spin />;
    // }

    if (!this.props.token) {
      return <Spin />;
    }
    const decideLoadComponent = this.componentSwitcher(
      this.props.match.params.page
    );
    return (
      <React.Fragment>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 2</span>
                <Link to="/dashboard/form" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
                <Link to="/dashboard/card" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              {decideLoadComponent}
            </Content>
          </Layout>
        </Layout>
        );
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    loading: state.auth.loading
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getUserDetail: token => dispatch(getUserDetail(token))
//   };
// };

export default withRouter(connect(mapStateToProps, null)(Dashboard));
