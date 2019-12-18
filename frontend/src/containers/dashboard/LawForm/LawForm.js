import { Form, Select, Row, Col, Button } from "antd";
import React from "react";
import { addToForm } from "../../../store/actions/exercise";
import { connect } from "react-redux";

import "./LawForm.css";
const { Option } = Select;

class LawForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addToForm(values)
        console.log("Received values of form: ", values);
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
              {getFieldDecorator("laws", {
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
    uuid: state.exercise.uuid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToForm: (data) => dispatch(addToForm(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedApp);


