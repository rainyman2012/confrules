import { Form, Select, Row, Col, Button } from "antd";
import React from "react";
import { updateUserExerciseTable } from "../../../store/actions/exercise";
import { connect } from "react-redux";

import "./LawForm.css";
const { Option } = Select;

class LawForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        this.props.updateUserExerciseTable(values, this.props.token, this.props.user.pk);
        console.log("Received values of form: ", values, this.props.token, this.props.user.pk);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center">
        <Col span={12} style={{ textAlign: "center", direction: "ltr" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator("law", {
                rules: [
                  { required: true, message: "یکی از موارد را انتخاب کنید!" }
                ]
              })(
                <Select
                  placeholder="لطفا یکی از قوانین و مقاررات را انتخاب کنید."
                  onChange={this.handleSelectChange}
                >
                  <Option value="مصوبات">مصوبات</Option>
                  <Option value="شیوه نامه‌ی حوضه ی ایرانیان">شیوه نامه‌ی حوضه ی ایرانیان</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                تاید
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedApp = Form.create({ name: "coordinated" })(LawForm);

const mapStateToProps = state => {
  return {
    loading: state.exercise.loading,
    error: state.exercise.error,
    user: state.auth.user,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserExerciseTable: (data, token, pk) => dispatch(updateUserExerciseTable(data, token, pk)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedApp);


