import { Form, Select, Row, Col, Button } from "antd";
import React from "react";
import "./DashForm.css";
const { Option } = Select;

class DashForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`
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
                  <Option value="mosavabat">مصوبات</Option>
                  <Option value="shive">شیوه نامه‌ی حوضه ی ایرانیان</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedApp = Form.create({ name: "coordinated" })(DashForm);

export default WrappedApp;
