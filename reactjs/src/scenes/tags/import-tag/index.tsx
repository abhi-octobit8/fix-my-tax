import * as React from 'react';
import { FormInstance } from 'antd/lib/form';

import { Button, Card, Col, Form, Row } from 'antd';
import { inject, observer } from 'mobx-react';

import Stores from '../../../stores/storeIdentifier';
import { requiredValidator } from '../../../utils/Validator';
import { L } from '../../../lib/abpUtility';
import AppComponentBase from '../../../components/AppComponentBase';
import CheckTagStore from '../../../stores/checkTagStore';
import utils from '../../../utils/utils';
export interface ISiteProps {
  checkTagStore: CheckTagStore;
  history: History;
}

type UploadState = {
  selectedFile: FileList | null;
  isLoading: boolean;
};
@inject(Stores.CheckTagStore)
@observer
class TagImport extends AppComponentBase<ISiteProps, UploadState> {
  state = {
    selectedFile: null,
    isLoading: false,
  };
  formRef = React.createRef<FormInstance>();

  handleSubmit = async (values: any) => {
    const form = this.formRef.current;
    this.setState({
      isLoading: true,
    });
    let formData = new FormData();

    let file: any = this.state.selectedFile;
    formData.append('file', file[0], file[0].name);
    let result = await this.props.checkTagStore.importTag(formData);
    if (result.success) {
      utils.showMessage({ message: 'record inserted Successfully', type: 'success' });
      form!.resetFields();
    } else {
      utils.showMessage({ message: result.msg, type: 'error' });
    }
    this.setState({
      isLoading: false,
    });
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedFile: event.currentTarget.files,
    });
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
          <Col span={24}>
            <h2>Tag Import</h2>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form ref={this.formRef} onFinish={this.handleSubmit}>
              <Form.Item
                label={L('File Upload')}
                {...formItemLayout}
                name={'emailId'}
                rules={[requiredValidator]}
              >
                <input
                  className="FileInput"
                  type="file"
                  accept=".xls, .xlsx"
                  onChange={this.onChangeHandler}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" loading={this.state.isLoading} htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    );
  }
}
export default TagImport;
