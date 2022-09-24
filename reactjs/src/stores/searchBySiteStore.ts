import { action, observable } from 'mobx';

import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetAllSearchBySiteOutput } from '../services/searchBySite/dto/getAllSearchBySiteOutput';
import { PagedSearchBySiteResultRequestDto } from '../services/searchBySite/dto/PagedSearchBySiteResultRequestDto';
import searchBySiteService from '../services/searchBySite/searchBySiteService';
import userService from '../services/user/userService';

class SearchBySiteStore {
  @observable searchBySite!: PagedResultDto<GetAllSearchBySiteOutput>;

  @action
  reset() {
    this.searchBySite.items = [];
    this.searchBySite.totalCount = 0;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedSearchBySiteResultRequestDto) {
    let result = await searchBySiteService.getAll(pagedFilterAndSortedRequest);
    this.searchBySite = result;
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default SearchBySiteStore;
