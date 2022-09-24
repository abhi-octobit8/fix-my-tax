import { PagedResultDto } from '../dto/pagedResultDto';
import http from '../httpService';
import { GetAllSearchByTagOutput } from './dto/getAllSearchByTagOutput';
import { PagedSearchByTagResultRequestDto } from './dto/PagedSearchByTagResultRequestDto';

class SearchByTagService {
  public async getAll(
    pagedFilterAndSortedRequest: PagedSearchByTagResultRequestDto
  ): Promise<PagedResultDto<GetAllSearchByTagOutput>> {
    let result = await http.get('api/services/app/BagScanService/GetSearchByTag', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }
}

export default new SearchByTagService();
