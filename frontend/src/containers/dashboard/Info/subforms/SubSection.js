import React from "react";

import { Form, Select, Row, Col, Button, message } from "antd";

const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        console.log("component did mount called");

        // To disabled submit button at the beginning.
        this.props.form.validateFields();

    }

    componentWillUnmount() {
        console.log("component will unmunt called");
        console.log("state changes")

    }

    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                message.info("received")
                this.props.next();
            }
            else {
                message.info("has error")
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const brancheError = isFieldTouched('branches') && getFieldError('branches');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={brancheError ? 'error' : ''} help={brancheError || 'فهرست نمایندگی ها'}>
                    {getFieldDecorator('branches', {
                        rules: [{ required: true, message: 'لطفا یکی از موارد زیر را انتخاب کنید!' }],
                    })(
                        <Select
                            placeholder="نمایندگی ها"
                            style={{ width: "300px" }}
                            onChange={this.handleChange}
                        >
                            <Option value="ایرانیان و خیرین خارج و داخل">ایرانیان و خیرین خارج و داخل</Option>
                            <Option value="خیریه های خارج از کشور">خیریه های خارج از کشور</Option>
                        </Select>
                    )}
                </Form.Item>

                <div className="steps-action">
                    {this.props.getCurrentSteps() < this.props.stepLength - 1 && (
                        <Button type="primary" onClick={(e) => this.handleSubmit(e)}>
                            بعدی
                        </Button>
                    )}

                    {this.props.getCurrentSteps() === this.props.stepLength - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            تایید نهایی
                        </Button>
                    )}

                    {this.props.getCurrentSteps() > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.props.prev()}>
                            قبلی
                        </Button>
                    )}
                </div>

            </Form >
        );
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default WrappedHorizontalLoginForm