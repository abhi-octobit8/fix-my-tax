import { action, observable } from 'mobx';

import { PagedResultDto } from '../services/dto/pagedResultDto';
import userService from '../services/user/userService';
import { GetAllSearchByTagOutput } from '../services/seachByTag/dto/getAllSearchByTagOutput';
import { PagedSearchByTagResultRequestDto } from '../services/seachByTag/dto/PagedSearchByTagResultRequestDto';
import searchByTagService from '../services/seachByTag/searchByTagService';

class SearchByTagStore {
  @observable searchByTag!: PagedResultDto<GetAllSearchByTagOutput>;
  @observable searchAllByTagName!: PagedResultDto<GetAllSearchByTagOutput>;

  @action
  async getAll(pagedFilterAndSortedRequest: PagedSearchByTagResultRequestDto) {
    let result = await searchByTagService.getAll(pagedFilterAndSortedRequest);
    this.searchByTag = result;
  }
  @action
  async getAllSearchByTagName(pagedFilterAndSortedRequest: PagedSearchByTagResultRequestDto) {
    let result = await searchByTagService.getAll(pagedFilterAndSortedRequest);
    this.searchAllByTagName = result;
  }

  // on unmount reset the store table data
  @action
  reset() {
    this.searchByTag.items = [];
    this.searchByTag.totalCount = 0;
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default SearchByTagStore;
