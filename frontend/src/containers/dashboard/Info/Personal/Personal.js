import React from "react";

import { Form, Select, Icon, Input, Radio, Button, message } from "antd";

const { Option } = Select;


class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        console.log("component did mount called");

        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    componentWillUnmount() {
        console.log("component will unmunt called");

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.next();
            }
        });
    };
    checkCaption = (rule, value, callback) => {
        if (value) {
            return callback();
        }
        callback('لطفا عنوان خود را وارد کنید');
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const captionError = isFieldTouched('caption') && getFieldError('caption');
        const PhoneError = isFieldTouched('phone') && getFieldError('phone');
        const overView = isFieldTouched('overview') && getFieldError('overview');

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="98">+98</Option>
                <Option value="1">+1</Option>
            </Select>,
        );

        // Only show error after a field is touched.
        return (
            <Form onSubmit={this.handleSubmit} style={{ textAlign: "right", margin: "10px" }} colon={false}>
                <Form.Item label="عنوان" validateStatus={captionError ? 'error' : ''} help={captionError || ''}>
                    {getFieldDecorator('caption', {
                        rules: [{ validator: this.checkCaption }],
                    })(
                        <Input
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="عنوان"
                            style={{ width: "400px" }}
                        />,
                    )}
                </Form.Item>

                <Form.Item label="مشخصات شناسایی" colon={false}>
                    {getFieldDecorator('radio-group')(
                        <Radio.Group>
                            <Radio value="مشخصات هویتی">مشخصات هویتی</Radio>
                            <Radio value="مشخصات ثبتی">مشخصات ثبتی</Radio>
                        </Radio.Group>,
                    )}
                </Form.Item>

                <Form.Item label="شماره ی تماس" colon={false} validateStatus={PhoneError ? 'error' : ''} help={PhoneError || ''}>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'لطفا شماره ی تماس خود را وارد کنید!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '400px' }} />)}
                </Form.Item>

                <Form.Item label="معرفی اجمالی" colon={false} validateStatus={overView ? 'error' : ''} help={PhoneError || ''}>
                    {getFieldDecorator('overview', {
                        rules: [{ required: true, message: 'لطفا مقداری بدای این فیلد تعین کنید!' }],
                    })(<textarea style={{ width: '400px', height: "300px" }} />)}
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
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default WrappedHorizontalLoginForm