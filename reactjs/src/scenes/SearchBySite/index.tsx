import * as React from 'react';

import { Button, Card, Col, Row, Table, DatePicker, Space, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import moment from 'moment';
import AppComponentBase from '../../components/AppComponentBase';
import { L } from '../../lib/abpUtility';
import Stores from '../../stores/storeIdentifier';
import { FormInstance } from 'antd/lib/form';
import ListHeader from '../../components/common/ListHeader/ListHeader';
import { RangeValue } from 'rc-picker/lib/interface';
import { DATE_FORMATS, getLocalTime } from '../../utils/timeUtils';
import SearchBySiteStore from '../../stores/searchBySiteStore';
import TagDetailsModal from '../SeachByTag/components/tagDetailsModal';
import SiteStore from '../../stores/siteStore';

export interface ISearchBySiteProps {
  searchBySiteStore: SearchBySiteStore;
  siteStore: SiteStore;
}

export interface ISearchBySiteState {
  maxResultCount: number;
  skipCount: number;
  filter: string;
  siteCode: string;
  startDate: string | null;
  endDate: string | null;
  isLoading: boolean;
  modalVisible: boolean;
  selectedValue: string;
}

const { RangePicker } = DatePicker;
const { Option } = Select;

@inject(Stores.SearchBySiteStore, Stores.SiteStore)
@observer
class SeachByTag extends AppComponentBase<ISearchBySiteProps, ISearchBySiteState> {
  formRef = React.createRef<FormInstance>();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    filter: '',
    siteCode: '',
    startDate: '',
    endDate: '',
    isLoading: false,
    modalVisible: false,
    selectedValue: '',
  };

  async getAll() {
    await this.props.searchBySiteStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      keyword: this.state.filter,
      siteCode: this.state.siteCode,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });
  }
  async getAllSiteName() {
    await this.props.siteStore.getAll({
      maxResultCount: 1000,
      skipCount: 0,
      keyword: '',
      filter: '',
    });
  }
  async componentDidMount() {
    await this.getAllSiteName();
  }

  componentWillUnmount() {
    if (this.props.searchBySiteStore.searchBySite) {
      this.props.searchBySiteStore.reset();
    }
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

  GetAllSearchBySite = async () => {
    this.setState({ isLoading: true });

    await this.getAll();
    this.setState({ isLoading: false });
  };

  handleBagChange = (value: string) => {
    this.setState({ siteCode: value });
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
    const { searchBySite } = this.props.searchBySiteStore;
    const siteNameList = this.props.siteStore.sites;
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
        <ListHeader leftContent={<h2>{L('Search By Site')}</h2>}></ListHeader>

        <Space>
          <Row align={'middle'}>
            <Col>
              <>
                {`Site Name:`}
                &nbsp;
              </>
            </Col>
            <Col>
              <Select
                showSearch
                allowClear={true}
                style={{ width: 200 }}
                onChange={this.handleBagChange}
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {_.sortBy(siteNameList?.items, 'siteName').map((data, index) => {
                  return (
                    <Option key={index} value={data.siteCode}>
                      {data.siteName}
                    </Option>
                  );
                })}
              </Select>
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
          <Button onClick={() => this.GetAllSearchBySite()} type={'primary'}>
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
                total: searchBySite === undefined ? 0 : searchBySite.totalCount,
                defaultCurrent: 1,
              }}
              loading={this.state.isLoading}
              dataSource={searchBySite === undefined ? [] : searchBySite.items}
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
