import React from 'react';
import { Col, Modal, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import { L } from '../../../lib/abpUtility';
import { DATE_FORMATS, getLocalTime } from '../../../utils/timeUtils';
import SearchByTagStore from '../../../stores/searchByTagStore';
import Stores from '../../../stores/storeIdentifier';
import AppComponentBase from '../../../components/AppComponentBase';

type ITagDetailsModalProps = {
  visible: boolean;
  onCancel: () => void;
  selectedValue: string;
};
export interface ISearchByTagProps {
  searchByTagStore: SearchByTagStore;
}

export interface ISearchByTagState {
  maxResultCount: number;
  skipCount: number;
  filter: string;
  bagNumber: string;
  startDate: string;
  endDate: string;
  isLoading: boolean;
  modalVisible: boolean;
}

@inject(Stores.SearchByTagStore)
@observer
class TagDetailsModal extends AppComponentBase<ITagDetailsModalProps, ISearchByTagState> {
  state = {
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    bagNumber: this.props.selectedValue,
    startDate: '',
    endDate: '',
    isLoading: false,
    modalVisible: false,
  };

  async componentDidMount() {
    await this.getAll();
  }
  get injected(): ISearchByTagProps {
    return this.props as ITagDetailsModalProps & ISearchByTagProps;
  }

  async getAll() {
    await this.injected.searchByTagStore.getAllSearchByTagName({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
      bagNumber: this.state.bagNumber,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });
  }

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };

  public render() {
    const { visible, onCancel } = this.props;
    const { searchAllByTagName } = this.injected.searchByTagStore;

    const columns = [
      {
        title: L('Site Name'),
        dataIndex: 'siteName',
        key: 'siteName',
        width: 150,
        render: (text: string, item: any) => <div>{item.scanSite.siteName}</div>,
      },
      {
        title: L('Site Code'),
        dataIndex: 'siteCode',
        key: 'siteCode',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('BagNumber'),
        dataIndex: 'bagNumber',
        key: 'bagNumber',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Scan Time'),
        dataIndex: 'scanTime',
        key: 'scanTime',
        width: 150,
        render: (value: string) => getLocalTime(value, DATE_FORMATS.LIST_DATE_TIME_FORMAT),
      },
    ];

    return (
      <>
        <Modal
          visible={visible}
          width={1000}
          onCancel={onCancel}
          title={this.props.selectedValue}
          destroyOnClose={true}
          footer={null}
        >
          <Row style={{ marginTop: 20 }}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              lg={{ span: 24, offset: 0 }}
              xl={{ span: 24, offset: 0 }}
              xxl={{ span: 24, offset: 0 }}
            >
              <Table
                rowKey={(record) => record.id.toString()}
                bordered={true}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  total: searchAllByTagName === undefined ? 0 : searchAllByTagName.totalCount,
                  defaultCurrent: 1,
                }}
                loading={this.state.isLoading}
                dataSource={searchAllByTagName === undefined ? [] : searchAllByTagName.items}
                onChange={this.handleTableChange}
              />
            </Col>
          </Row>
        </Modal>
      </>
    );
  }
}

export default TagDetailsModal;
