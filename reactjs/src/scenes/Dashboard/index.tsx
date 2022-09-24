import * as React from 'react';
import { Row, Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';
import { EnvironmentOutlined, ApiOutlined, BarcodeOutlined, TagOutlined } from '@ant-design/icons';
import './index.less';
import Stores from '../../stores/storeIdentifier';
// import TinyLineChartExample from './components/TinyLineChartExample';

import LineChartExample from './components/LineChartExample';
// import ListExample from './components/ListExample';
import DashboardStore from '../../stores/dashboardStore';
import AppComponentBase from '../../components/AppComponentBase';
import { RouteComponentProps } from 'react-router-dom';

export interface IDashboardProps {
  dashboardStore: DashboardStore;
  history: History;
}

type dashboardProps = IDashboardProps & RouteComponentProps;
@inject(Stores.DashboardStore)
@observer
export class Dashboard extends AppComponentBase<dashboardProps> {
  _isMounted = false;
  async componentDidMount() {
    this._isMounted = true;
    await this.getAllDashboardCounters();
    await this.getAllDayWiseScanCount();
    if (this._isMounted) {
      this.setState({ cardLoading: false });
      this.setState({ lineChartLoading: false });
    }
    // setTimeout(() => this.setState({ cardLoading: false }), 1000);
    // setTimeout(() => this.setState({ lineChartLoading: false }), 1500);
    // setTimeout(() => this.setState({ barChartLoading: false }), 2000);
    // setTimeout(() => this.setState({ pieChartLoading: false }), 1000);
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }
  async getAllDashboardCounters() {
    await this.props.dashboardStore.getAllDashboardCounterStore();
  }
  async getAllDayWiseScanCount() {
    await this.props.dashboardStore.getDayWiseScanCountStore();
  }
  state = {
    cardLoading: true,
    lineChartLoading: true,
    barChartLoading: true,
    pieChartLoading: true,
  };
  render() {
    const { cardLoading, lineChartLoading } = this.state;
    const { dashboardCounters, dashboardDayWiseScanCount } = this.props.dashboardStore;

    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <div
              className="dashboardCardButton"
              onClick={() => this.props.history.push('/sites?select=all')}
            >
              <Card
                bodyStyle={{ padding: 10, backgroundColor: '#e91e63', borderRadius: '5px' }}
                loading={cardLoading}
                bordered={false}
              >
                <Col span={8}>
                  <EnvironmentOutlined className={'dashboardCardIcon'} />
                </Col>
                <Col span={16}>
                  <p className={'dashboardCardName'}>Total Sites</p>
                  <label className={'dashboardCardCounter'}>{dashboardCounters?.totalSites}</label>
                </Col>
              </Card>
            </div>
          </Col>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <div
              className="dashboardCardButton"
              onClick={() => this.props.history.push('/sites?select=online')}
            >
              <Card
                bodyStyle={{ padding: 10, backgroundColor: '#00bcd4', borderRadius: '5px' }}
                loading={cardLoading}
                bordered={false}
              >
                <Col span={8}>
                  <ApiOutlined className={'dashboardCardIcon'} />
                </Col>
                <Col span={16}>
                  <p className={'dashboardCardName'}>Online Sites</p>
                  <label className={'dashboardCardCounter'}>{dashboardCounters?.onlineSites}</label>
                </Col>
              </Card>
            </div>
          </Col>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <div
              className="dashboardCardButton"
              onClick={() => this.props.history.push('/scans?select=all')}
            >
              <Card
                bodyStyle={{ padding: 10, backgroundColor: '#8bc34a', borderRadius: '5px' }}
                loading={cardLoading}
                bordered={false}
              >
                <Col span={8}>
                  <BarcodeOutlined className={'dashboardCardIcon'} />
                </Col>
                <Col span={16}>
                  <p className={'dashboardCardName'}>Total Scans</p>
                  <label className={'dashboardCardCounter'}>{dashboardCounters?.totalScans}</label>
                </Col>
              </Card>
            </div>
          </Col>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <div
              className="dashboardCardButton"
              onClick={() => this.props.history.push('/scans?select=today')}
            >
              <Card
                bodyStyle={{ padding: 10, backgroundColor: '#ff9800', borderRadius: '5px' }}
                loading={cardLoading}
                bordered={false}
              >
                <Col span={8}>
                  <TagOutlined className={'dashboardCardIcon'} />
                </Col>
                <Col span={16}>
                  <p className={'dashboardCardName'}>Scans Today</p>
                  <label className={'dashboardCardCounter'}>{dashboardCounters?.scansToday}</label>
                </Col>
              </Card>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card
              className={'dashboardBox'}
              title="Scans Statistics"
              loading={lineChartLoading}
              bordered={false}
            >
              <LineChartExample items={dashboardDayWiseScanCount?.items} />
            </Card>
          </Col>
        </Row>

        {/* <Row gutter={16}>
          <Col
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 22 }}
            lg={{ offset: 0, span: 8 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 8 }}
          >
            <Card className={'dashboardCardTinyLine'} loading={barChartLoading} bordered={false}>
              <TinyLineChartExample />
              <ListExample value={visitorStatisticList} />
            </Card>
          </Col>
          <Col
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 22 }}
            lg={{ offset: 0, span: 8 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 8 }}
          >
            <Card className={'latestSocialTrendsList'} loading={barChartLoading} bordered={false}>
              <TinyLineChartExample />
              <ListExample value={visitorStatisticList} />
            </Card>
          </Col>
          <Col
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 22 }}
            lg={{ offset: 0, span: 8 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 8 }}
          >
            <Card className={'answeredTickeds'} loading={barChartLoading} bordered={false}>
              <TinyLineChartExample />
              <ListExample value={visitorStatisticList} />
            </Card>
          </Col>
        </Row> */}

        {/* <Row gutter={16}>
          <Col span={16}>
            <Card
              title="Payment Statistics"
              className={'dashboardBox'}
              loading={barChartLoading}
              bordered={false}
            >
              <BarChartExample />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Browser Usage"
              className={'dashboardBox'}
              loading={pieChartLoading}
              bordered={false}
            >
              <PieChartExample />
            </Card>
          </Col>
        </Row> */}
      </React.Fragment>
    );
  }
}

export default Dashboard;
