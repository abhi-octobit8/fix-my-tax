import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { GetScansOutput } from './dto/getScansOutput';
import { PagedScansResultRequestDto } from './dto/PagedScansResultRequestDto';

class ScansService {
  public async getAll(
    pagedFilterAndSortedRequest: PagedScansResultRequestDto
  ): Promise<PagedResultDto<GetScansOutput>> {
    let result = await http.get('api/services/app/BagScanService/GetSearchBySite', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }
}

export default new ScansService();
