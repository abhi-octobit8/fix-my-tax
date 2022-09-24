import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { GetAllSearchBySiteOutput } from './dto/getAllSearchBySiteOutput';
import { PagedSearchBySiteResultRequestDto } from './dto/PagedSearchBySiteResultRequestDto';

class SearchBySiteService {
  public async getAll(
    pagedFilterAndSortedRequest: PagedSearchBySiteResultRequestDto
  ): Promise<PagedResultDto<GetAllSearchBySiteOutput>> {
    let result = await http.get('api/services/app/BagScanService/GetSearchBySite', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }
  public async getAllSiteCode(): Promise<PagedResultDto<GetAllSearchBySiteOutput>> {
    let result = await http.get('api/services/app/BagScanService/GetSearchBySite');
    return result.data.result;
  }
}

export default new SearchBySiteService();
