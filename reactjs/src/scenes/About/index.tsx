import * as React from 'react';
import { FormInstance } from 'antd/lib/form';

import { Button, Card, Col, Form, Input, Row } from 'antd';
import { phoneNumberValidator, requiredValidator } from '../../utils/Validator';
import { L } from '../../lib/abpUtility';
import './index.less';
import HelpStore from '../../stores/helpStore';
import { inject, observer } from 'mobx-react';
import Stores from '../../stores/storeIdentifier';
export interface ISiteProps {
  helpStore: HelpStore;
}
@inject(Stores.HelpStore)
@observer
export class About extends React.Component<any> {
  formRef = React.createRef<FormInstance>();
  handleSubmit = async (values: any) => {
    const form = this.formRef.current;
    await this.props.helpStore.create(values);
    form!.resetFields();
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
        xl: { span: 8 },
        xxl: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
        md: { span: 14 },
        lg: { span: 14 },
        xl: { span: 14 },
        xxl: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Card>
        <Row>
          <Col span={16}>
            <h2>Contact Us</h2>
          </Col>
          <Col span={8}>
            <h2>How we can Help You?</h2>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Form ref={this.formRef} onFinish={this.handleSubmit}>
              <Form.Item
                label={L('Your Name')}
                {...formItemLayout}
                name={'name'}
                rules={[requiredValidator]}
              >
                <Input placeholder="Please input Name" />
              </Form.Item>

              <Form.Item
                label={L('Email Id')}
                {...formItemLayout}
                name={'emailId'}
                rules={[requiredValidator]}
              >
                <Input placeholder="Please input Email Id" />
              </Form.Item>
              <Form.Item
                label={L('Phone Number')}
                {...formItemLayout}
                name={'phone'}
                rules={[requiredValidator, phoneNumberValidator]}
              >
                <Input placeholder="Please input Phone Number" />
              </Form.Item>
              <Form.Item
                label={L('Subject')}
                {...formItemLayout}
                name={'subject'}
                rules={[requiredValidator]}
              >
                <Input placeholder="Subject" />
              </Form.Item>
              <Form.Item
                label={L('Description')}
                {...formItemLayout}
                name={'description'}
                rules={[requiredValidator]}
              >
                <Input.TextArea placeholder="Description" maxLength={100} />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={10}>
            <div>
              <Row>
                <Col span={24}>
                  <div className={'contentHelpBlock'}>
                    <h3 className={'header'}>Support</h3>
                    <span className={'content'}>support@zupiers.com</span>
                  </div>
                </Col>
                <Col span={24}>
                  <div className={'contentHelpBlock'}>
                    <h3 className={'header'}>Point of Contact</h3>
                    <span className={'content'}>8446314179</span>
                  </div>
                </Col>
                <Col span={24}>
                  <div className={'contentHelpBlock'}>
                    <h3 className={'header'}>Information</h3>
                    <span className={'content'}>
                      {' '}
                      Please write to us if you any issue. we will get in touch as soon as we can
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}
export default About;
