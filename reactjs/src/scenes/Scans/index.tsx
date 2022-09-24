import * as React from 'react';

import { Card, Col, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';
import { FormInstance } from 'antd/lib/form';

import AppComponentBase from '../../components/AppComponentBase';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import ListHeader from '../../components/common/ListHeader/ListHeader';
import { DATE_FORMATS, getLocalTime } from '../../utils/timeUtils';
import ScansStore from '../../stores/scansStore';
import TagDetailsModal from '../SeachByTag/components/tagDetailsModal';

export interface IScansProps {
  scansStore: ScansStore;
}

export interface IScansState {
  maxResultCount: number;
  skipCount: number;
  filter: string;
  isLoading: boolean;
  modalVisible: boolean;
  selectedValue: string;
}

@inject(Stores.ScansStore)
@observer
class Scans extends AppComponentBase<IScansProps, IScansState> {
  formRef = React.createRef<FormInstance>();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    isLoading: false,
    modalVisible: false,
    selectedValue: '',
  };

  async getAll() {
    await this.props.scansStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
      filter: window.location.search.substring(1).split('=')[1], // get url string take the select value either online or all
    });
  }
  async componentDidMount() {
    await this.getAll();
  }

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  async tagDetailModalOpen(value: string) {
    if (value) {
      this.setState({ selectedValue: value });
      this.Modal();
    }
  }

  public render() {
    const { scansResult } = this.props.scansStore;
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
        render: (value: string, row: any) => (
          <a onClick={() => this.tagDetailModalOpen(value)}>{value}</a>
        ),
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
      <Card>
        <ListHeader leftContent={<h2>{L('Scans')}</h2>}></ListHeader>

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
                total: scansResult === undefined ? 0 : scansResult.totalCount,
                defaultCurrent: 1,
              }}
              loading={this.state.isLoading}
              dataSource={scansResult === undefined ? [] : scansResult.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        {this.state.modalVisible && (
          <TagDetailsModal
            visible={this.state.modalVisible}
            onCancel={() => {
              this.setState({
                modalVisible: false,
              });
            }}
            selectedValue={this.state.selectedValue}
          />
        )}
      </Card>
    );
  }
}

export default Scans;
