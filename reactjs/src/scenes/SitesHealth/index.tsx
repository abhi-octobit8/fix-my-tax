import * as React from 'react';

import { Card, Col, Input, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import SiteStore from '../../stores/siteStore';
import { FormInstance } from 'antd/lib/form';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import ListHeader from '../../components/common/ListHeader/ListHeader';
export interface ISiteProps {
  siteStore: SiteStore;
}

export interface ISiteState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  siteId: number;
  filter: string;
}

const Search = Input.Search;

@inject(Stores.SiteStore)
@observer
class SitesHealth extends AppComponentBase<ISiteProps, ISiteState> {
  formRef = React.createRef<FormInstance>();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    siteId: 0,
    filter: '',
  };

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    await this.props.siteStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
    });
  }
  componentWillUnmount() {
    if (this.props.siteStore.sites) {
      this.props.siteStore.reset();
    }
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

  handleSearch = (value: string) => {
    this.setState({ filter: value }, async () => await this.getAll());
  };

  public render() {
    const { sites } = this.props.siteStore;
    const columns = [
      {
        title: L('S. No.'),
        dataIndex: 'siteName',
        key: 'index',
        width: 100,
        // render: (text: string) => <div>{text}</div>,
        render: (text: string, record: any, index: number) => {
          return <>{this.state.skipCount + index + 1}</>;
        },
      },

      {
        title: L('Site Name'),
        dataIndex: 'siteName',
        key: 'siteName',
        width: 250,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: 'Status',
        dataIndex: 'state',
        render: (value: string) => {
          return (
            <span
              style={{
                color: value ? '#19b820' : '#FF4A35',
                padding: '2px 5px',
                borderRadius: '4px',
              }}
            >
              <span style={{ marginRight: '5px' }}>
                {value ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              </span>
              {value ? 'Up' : 'Down'}
            </span>
          );
        },
      },
      // {
      //   title: 'Reader State',
      //   dataIndex: 'active',
      //   render: (value: string) => {
      //     return (
      //       <span
      //         style={{
      //           color: value ? '#19b820' : '#FF4A35',
      //           padding: '2px 5px',
      //           borderRadius: '4px',
      //         }}
      //       >
      //         <span style={{ marginRight: '5px' }}>
      //           {value ? <UpCircleOutlined /> : <DownCircleOutlined />}
      //         </span>
      //         {value ? 'Up' : 'Down'}
      //       </span>
      //     );
      //   },
      // },
      {
        title: 'Internet State',
        dataIndex: 'internetState',
        render: (value: string) => {
          return (
            <span
              style={{
                color: value ? '#19b820' : '#FF4A35',
                padding: '2px 5px',
                borderRadius: '4px',
              }}
            >
              <span style={{ marginRight: '5px' }}>
                {value ? <PoweroffOutlined /> : <PoweroffOutlined />}
              </span>
              {value ? 'Online' : 'Offline'}
            </span>
          );
        },
      },
      // {
      //   title: L('Site Code'),
      //   dataIndex: 'siteCode',
      //   key: 'siteCode',
      //   width: 150,
      //   render: (text: string) => <div>{text}</div>,
      // },
    ];
    return (
      <Card>
        <ListHeader leftContent={<h2>{L('Sites Health')}</h2>}></ListHeader>
        <Row>
          <Col sm={{ span: 10, offset: 0 }}>
            <Search placeholder={this.L('Filter')} onSearch={this.handleSearch} />
          </Col>
        </Row>
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
                total: sites === undefined ? 0 : sites.totalCount,
                defaultCurrent: 1,
              }}
              loading={sites === undefined ? true : false}
              dataSource={sites === undefined ? [] : sites.items}
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default SitesHealth;
