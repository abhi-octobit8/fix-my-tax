import * as React from 'react';
import { Button, Card, Checkbox, Col, Descriptions, Form, Input, Row } from 'antd';
import { inject, observer } from 'mobx-react';

import ListHeader from '../../../components/common/ListHeader/ListHeader';
import { L } from '../../../lib/abpUtility';
import Stores from '../../../stores/storeIdentifier';
import CheckTagStore from '../../../stores/checkTagStore';
import { DATE_FORMATS, getLocalTime } from '../../../utils/timeUtils';

export interface ISiteProps {
  checkTagStore: CheckTagStore;
}

const CheckTag = inject(Stores.CheckTagStore)(
  observer(({ checkTagStore }: ISiteProps) => {
    const { tagData } = checkTagStore;
    const [form] = Form.useForm();
    React.useEffect(() => {
      return () => checkTagStore.reset();
    }, []);

    const onFinish = async (values: any) => {
      await checkTagStore.reset();

      if (values.isSearchByEPC) {
        await checkTagStore.get({
          epcNumber: values.bagNumberValue,
        });
      } else {
        await checkTagStore.get({
          bagNumber: values.bagNumberValue,
        });
      }
    };
    return (
      <Card style={{ width: '100%', height: '100%' }}>
        <ListHeader leftContent={<h2>{L('Check Tag')}</h2>}></ListHeader>

        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item name="isSearchByEPC" valuePropName="checked">
            <Checkbox>Search By EPC Number</Checkbox>
          </Form.Item>

          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => {
              let label = 'Bag Number';
              if (getFieldValue('isSearchByEPC')) {
                label = 'EPC Number';
              }

              return (
                <Form.Item
                  label={label}
                  name="bagNumberValue"
                  rules={[{ required: true, message: `Please input ${label}!` }]}
                >
                  <Input placeholder={label} />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                Find Bag
              </Button>
            )}
          </Form.Item>
        </Form>

        <Row style={{ marginTop: 20 }}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 24, offset: 0 }}
            xl={{ span: 24, offset: 0 }}
            xxl={{ span: 24, offset: 0 }}
          >
            {tagData && tagData.bagNumber ? (
              <Descriptions
                layout="vertical"
                title="Tag Info"
                bordered
                extra={
                  <Button type="primary" disabled>
                    Edit
                  </Button>
                }
              >
                <Descriptions.Item label="BagNumber">{tagData?.bagNumber}</Descriptions.Item>
                <Descriptions.Item label="EPC Number">{tagData?.epcNumber}</Descriptions.Item>
                <Descriptions.Item label="Creation Time">
                  {getLocalTime(tagData?.creationTime, DATE_FORMATS.LIST_DATE_TIME_FORMAT)}
                </Descriptions.Item>
              </Descriptions>
            ) : null}
          </Col>
        </Row>
      </Card>
    );
  })
);

export default CheckTag;
