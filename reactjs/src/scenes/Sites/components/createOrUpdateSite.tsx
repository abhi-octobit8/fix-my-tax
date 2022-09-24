import * as React from 'react';
import { Input, Modal, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

import { L } from '../../../lib/abpUtility';
import { requiredValidator } from '../../../utils/Validator';

export interface ICreateOrUpdateSiteProps {
  visible: boolean;
  onCancel: () => void;
  modalType: string;
  onCreate: () => void;
  formRef: React.RefObject<FormInstance>;
}

class CreateOrUpdateSite extends React.Component<ICreateOrUpdateSiteProps> {
  state = {
    confirmDirty: false,
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
        xs: { span: 16 },
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
        xl: { span: 16 },
        xxl: { span: 16 },
      },
    };

    const { visible, onCancel, onCreate } = this.props;
    return (
      <Modal
        visible={visible}
        cancelText={L('Cancel')}
        okText={this.props.modalType === 'edit' ? L('Update') : L('Create')}
        onCancel={onCancel}
        onOk={onCreate}
        title={'Site'}
        destroyOnClose={true}
      >
        <Form ref={this.props.formRef}>
          <Form.Item
            label={L('Site Name')}
            {...formItemLayout}
            name={'siteName'}
            rules={[requiredValidator]}
          >
            <Input placeholder="Please input site name" />
          </Form.Item>
          {this.props.modalType != 'edit' ? (
            <Form.Item
              label={L('Site Code')}
              {...formItemLayout}
              name={'siteCode'}
              rules={[requiredValidator]}
            >
              <Input placeholder="Please input site code" />
            </Form.Item>
          ) : null}
          <Form.Item
            label={L('Location')}
            {...formItemLayout}
            name={'location'}
            rules={[requiredValidator]}
          >
            <Input placeholder="Please input location" />
          </Form.Item>
          <Form.Item
            label={L('Contact Person')}
            {...formItemLayout}
            name={'contactPerson'}
            rules={[requiredValidator]}
          >
            <Input placeholder="Please input contact person" />
          </Form.Item>
          <Form.Item
            label={L('Contact Number')}
            {...formItemLayout}
            name={'contactNumber'}
            rules={[requiredValidator]}
          >
            <Input placeholder="Please input contact number" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateOrUpdateSite;
