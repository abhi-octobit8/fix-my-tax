import * as React from 'react';

import { Button, Card, Col, Dropdown, Input, Menu, Row, Table } from 'antd';
import { inject, observer } from 'mobx-react';

import AppComponentBase from '../../components/AppComponentBase';
import { EntityDto } from '../../services/dto/entityDto';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import SiteStore from '../../stores/siteStore';
import { FormInstance } from 'antd/lib/form';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import CreateOrUpdateSite from './components/createOrUpdateSite';

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
class Sites extends AppComponentBase<ISiteProps, ISiteState> {
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
  componentWillUnmount() {
    if (this.props.siteStore.sites) {
      this.props.siteStore.reset();
    }
  }

  async getAll() {
    await this.props.siteStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
      filter:window.location.search.substring(1).split('=')[1] // get url string take the select value either online or all
    });
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

  async createOrUpdateModalOpen(entityDto: EntityDto) {
    if (entityDto.id === 0) {
      await this.props.siteStore.createSite();
    } else {
      //edit case
      await this.props.siteStore.get(entityDto);
    }
    this.setState({ siteId: entityDto.id });
    this.Modal();
    setTimeout(() => {
      this.formRef.current?.setFieldsValue({ ...this.props.siteStore.editSite });
    }, 100);
  }

  handleCreate = () => {
    const form = this.formRef.current;
    form!.validateFields().then(async (values: any) => {
      if (this.state.siteId === 0) {
        await this.props.siteStore.create(values);
      } else {
        await this.props.siteStore.update({
          ...values,
          id: this.state.siteId,
          siteCode: this.props.siteStore.editSite.siteCode, // as site code is not editable so we are sending same again
        });
      }
      await this.getAll();
      this.setState({ modalVisible: false });
      form!.resetFields();
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
        width: 50,
        // render: (text: string) => <div>{text}</div>,
        render: (text: string, record: any, index: number) => {
          return <>{this.state.skipCount + index + 1}</>;
        },
      },

      {
        title: L('Site Name'),
        dataIndex: 'siteName',
        key: 'siteName',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      // {
      //   title: L('Site Code'),
      //   dataIndex: 'siteCode',
      //   key: 'siteCode',
      //   width: 150,
      //   render: (text: string) => <div>{text}</div>,
      // },
      {
        title: L('Location'),
        dataIndex: 'location',
        key: 'location',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Contact Person'),
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Contact Number'),
        dataIndex: 'contactNumber',
        key: 'contactNumber',
        width: 150,
        render: (text: string) => <div>{text}</div>,
      },
      {
        title: L('Actions'),
        width: 150,
        render: (text: string, item: any) => (
          <div>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item onClick={() => this.createOrUpdateModalOpen({ id: item.id })}>
                    {L('Edit')}
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Button type="primary" icon={<SettingOutlined />}>
                {L('Actions')}
              </Button>
            </Dropdown>
          </div>
        ),
      },
    ];
    return (
      <Card>
        <Row>
          <Col
            xs={{ span: 4, offset: 0 }}
            sm={{ span: 4, offset: 0 }}
            md={{ span: 4, offset: 0 }}
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            {' '}
            <h2>{L('Sites')}</h2>
          </Col>
          <Col
            xs={{ span: 14, offset: 0 }}
            sm={{ span: 15, offset: 0 }}
            md={{ span: 15, offset: 0 }}
            lg={{ span: 1, offset: 21 }}
            xl={{ span: 1, offset: 21 }}
            xxl={{ span: 1, offset: 21 }}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => this.createOrUpdateModalOpen({ id: 0 })}
            />
          </Col>
        </Row>
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
        <CreateOrUpdateSite
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
            this.formRef.current?.resetFields();
          }}
          modalType={this.state.siteId === 0 ? 'create' : 'edit'}
          onCreate={this.handleCreate}
        />
      </Card>
    );
  }
}

export default Sites;
