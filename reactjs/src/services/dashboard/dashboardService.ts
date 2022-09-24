import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { GetDashboardCounters } from './dto/getAllDashboardCounter';
import { GetDayWiseScanCount } from './dto/getDayWiseScanCount';

class DashboardService {
  public async getAllDashboardCounters(): Promise<GetDashboardCounters> {
    let result = await http.get('api/services/app/DashboardService/GetDashboardCounters');
    return result.data.result;
  }
  public async getDayWiseScanCount(): Promise<PagedResultDto<GetDayWiseScanCount>> {
    let result = await http.get('api/services/app/DashboardService/GetLast7DaysScans');
    return result.data.result;
  }
}

export default new DashboardService();
