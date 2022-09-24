import * as React from 'react';

import { Button, Card, Col, Input, Row, Table, DatePicker, Space } from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { RangeValue } from 'rc-picker/lib/interface';
import { FormInstance } from 'antd/lib/form';

import AppComponentBase from '../../components/AppComponentBase';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import ListHeader from '../../components/common/ListHeader/ListHeader';
import SearchByTagStore from '../../stores/searchByTagStore';
import { DATE_FORMATS, getLocalTime } from '../../utils/timeUtils';
import TagDetailsModal from './components/tagDetailsModal';
// import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export interface ISearchByTagProps {
  searchByTagStore: SearchByTagStore;
}

export interface ISearchByTagState {
  maxResultCount: number;
  skipCount: number;
  filter: string;
  bagNumber: string;
  startDate: string | null;
  endDate: string | null;
  isLoading: boolean;
  modalVisible: boolean;
  selectedValue: string;
}

const { RangePicker } = DatePicker;

@inject(Stores.SearchByTagStore)
@observer
class SeachByTag extends AppComponentBase<ISearchByTagProps, ISearchByTagState> {
  formRef = React.createRef<FormInstance>();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    bagNumber: '',
    startDate: '',
    endDate: '',
    isLoading: false,
    modalVisible: false,
    selectedValue: '',
  };

  async getAll() {
    await this.props.searchByTagStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
      bagNumber: this.state.bagNumber,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });
  }

  componentWillUnmount() {
    if (this.props.searchByTagStore.searchByTag) {
      this.props.searchByTagStore.reset();
    }
  }
  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };

  GetAllSearchByTag = async () => {
    this.setState({ isLoading: true });

    await this.getAll();
    this.setState({ isLoading: false });
  };

  handleBagChange = (value: string) => {
    this.setState({ bagNumber: value });
  };

  onChangeDateRange = (value: RangeValue<moment.Moment>) => {
    //for utc
    // this.setState({
    //   startDate: value
    //     ? moment(value![0]).startOf('day').utc().format('YYYY-MM-DD HH:mm:ss')
    //     : null,
    // });
    this.setState({
      startDate: value ? moment(value![0]).startOf('day').format('YYYY-MM-DD HH:mm:ss') : null,
    });
    this.setState({
      endDate: value ? moment(value![1]).endOf('day').format('YYYY-MM-DD HH:mm:ss') : null,
    });
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
    const { searchByTag } = this.props.searchByTagStore;
    const columns = [
      {
        title: L('Site Name'),
        dataIndex: 'siteName',
        key: 'siteName',
        width: 150,
        render: (text: string, item: any) => <div>{item.scanSite.siteName}</div>,
      },
      // {
      //   title: L('Site Code'),
      //   dataIndex: 'siteCode',
      //   key: 'siteCode',
      //   width: 150,
      //   render: (text: string) => <div>{text}</div>,
      // },
      {
        title: L('BagNumber'),
        dataIndex: 'bagNumber',
        key: 'bagNumber',
        width: 150,
        // render: (text: string) => <div>{text}</div>,
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
        <ListHeader leftContent={<h2>{L('Search By Tag')}</h2>}></ListHeader>

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
                onChange={(e) => this.handleBagChange(e.target.value)}
              />
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col>
              <>
                {`Select date Range:`}
                &nbsp;
              </>
            </Col>
            <Col>
              <RangePicker onChange={(dates) => this.onChangeDateRange(dates)} />
            </Col>
          </Row>
          <Button onClick={() => this.GetAllSearchByTag()} type={'primary'}>
            Get All
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
            <Table
              rowKey={(record) => record.id.toString()}
              bordered={true}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: searchByTag === undefined ? 0 : searchByTag.totalCount,
                defaultCurrent: 1,
              }}
              loading={this.state.isLoading}
              dataSource={searchByTag === undefined ? [] : searchByTag.items}
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

export default SeachByTag;
