import { action, observable } from 'mobx';

import { PagedResultDto } from '../services/dto/pagedResultDto';
import { GetScansOutput } from '../services/scans/dto/getScansOutput';
import { PagedScansResultRequestDto } from '../services/scans/dto/PagedScansResultRequestDto';
import scansService from '../services/scans/scansService';
import userService from '../services/user/userService';

class ScansStore {
  @observable scansResult!: PagedResultDto<GetScansOutput>;

  @action
  async getAll(pagedFilterAndSortedRequest: PagedScansResultRequestDto) {
    let result = await scansService.getAll(pagedFilterAndSortedRequest);
    this.scansResult = result;
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default ScansStore;
