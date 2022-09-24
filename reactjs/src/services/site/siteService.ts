import { PagedResultDto } from '../dto/pagedResultDto';
import { PagedSiteResultRequestDto } from './dto/PagedSiteResultRequestDto';
import http from '../httpService';
import { GetAllSiteOutput } from './dto/getAllSiteOutput';
import { CreateOrUpdateSiteInput } from './dto/createOrUpdateSiteInput';
import { EntityDto } from '../dto/entityDto';

class SiteService {
  public async create(createSiteInput: CreateOrUpdateSiteInput) {
    let result = await http.post('api/services/app/SiteService/Create', createSiteInput);
    return result.data.result;
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedSiteResultRequestDto
  ): Promise<PagedResultDto<GetAllSiteOutput>> {
    let result = await http.get('api/services/app/SiteService/GetAll', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }
  public async get(entityDto: EntityDto): Promise<GetAllSiteOutput> {
    let result = await http.get('api/services/app/SiteService/Get', { params: entityDto });
    return result.data.result;
  }
  public async update(updateSite: CreateOrUpdateSiteInput) {
    let result = await http.put('api/services/app/SiteService/Update', updateSite);
    return result.data.result;
  }
}

export default new SiteService();
