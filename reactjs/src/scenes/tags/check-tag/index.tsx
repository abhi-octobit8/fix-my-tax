import * as React from 'react';
import { Button, Card, Col, Descriptions, Input, Row, Space } from 'antd';
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
    const [bagNumber, setBugNumber] = React.useState<string>('');
    const { tagData } = checkTagStore;

    React.useEffect(() => {
      return () => checkTagStore.reset();
    }, []);

    const getTag = async () => {
      await checkTagStore.get({
        bagNumber,
      });
    };
    const handleBagChange = (value: string) => {
      setBugNumber(value);
    };

    const findBagSubmit = async () => {
      await checkTagStore.reset();
      await getTag();
    };

    return (
      <Card style={{ width: '100%', height: '100%' }}>
        <ListHeader leftContent={<h2>{L('Check Tag')}</h2>}></ListHeader>
        <Space>
          <Row align={'middle'}>
            <Col>
              <>
                {`Bag Number:`}
                &nbsp;
              </>
            </Col>
            <Col>
              <Input
                placeholder="Please input bag number"
                onChange={(e) => handleBagChange(e.target.value)}
              />
            </Col>
          </Row>

          <Button type={'primary'} onClick={() => findBagSubmit()}>
            Find Bag
          </Button>
        </Space>

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
