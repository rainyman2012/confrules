import { Button, Row, Col, Slider, Icon, Spin } from "antd";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchData, setGAClientId } from "../store/actions/exercise";
import { Lang as T } from "../languages";

class HomepageLayout extends React.Component {
  componentDidMount() {
    // if (this.props.match.params.uuid) {
    //   this.props.fetchData(this.props.match.params.uuid);
    // }

    console.log("language is ", this.props.language);
  }


  render() {
    const general_texts = T[this.props.language];
    console.log(general_texts);

    return (
      <Row style={{ height: "100vh" }}>
        <Col span={24} style={{ fontSize: "2em", position: "relative", top: "50%", textAlign: "center" }}>
          <h3>{general_texts.title}</h3>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    uuid: state.exercise.uuid,
    name: state.exercise.name,
    clientId: state.exercise.clientId,
    serverError: state.exercise.error,
    language: state.general.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: uuid => dispatch(fetchData(uuid)),
    setClientId: clientId => dispatch(setGAClientId(clientId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomepageLayout)
);
