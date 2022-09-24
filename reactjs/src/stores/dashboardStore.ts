import { action, observable } from 'mobx';

import dashboardService from '../services/dashboard/dashboardService';
import type { GetDashboardCounters } from '../services/dashboard/dto/getAllDashboardCounter';
import { GetDayWiseScanCount } from '../services/dashboard/dto/getDayWiseScanCount';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { DATE_FORMATS, getLocalTime } from '../utils/timeUtils';

class DashboardStore {
  @observable dashboardCounters!: GetDashboardCounters;
  @observable dashboardDayWiseScanCount!: PagedResultDto<GetDayWiseScanCount>;

  @action
  async getAllDashboardCounterStore() {
    let result = await dashboardService.getAllDashboardCounters();
    this.dashboardCounters = result;
  }
  @action
  async getDayWiseScanCountStore() {
    let result = await dashboardService.getDayWiseScanCount();

    result.items.forEach((element) => {
      element.scanFormattedViewDate = getLocalTime(
        element.scanDate,
        DATE_FORMATS.DEFAULT_DATE_FORMAT
      );
    });
    this.dashboardDayWiseScanCount = result;
  }
}

export default DashboardStore;
