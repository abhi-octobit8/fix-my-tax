import { action, observable } from 'mobx';

import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedUserResultRequestDto } from '../services/user/dto/PagedUserResultRequestDto';
import userService from '../services/user/userService';
import siteService from '../services/site/siteService';
import { CreateOrUpdateSiteInput } from '../services/site/dto/createOrUpdateSiteInput';
import { GetAllSiteOutput } from '../services/site/dto/getAllSiteOutput';
import { EntityDto } from '../services/dto/entityDto';

class SiteStore {
  @observable sites!: PagedResultDto<GetAllSiteOutput>;
  @observable editSite!: GetAllSiteOutput;

  @action
  async create(createSiteInput: CreateOrUpdateSiteInput) {
    let result = await siteService.create(createSiteInput);
    console.log('store response', result);
    this.sites.items.push(result);
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedUserResultRequestDto) {
    let result = await siteService.getAll(pagedFilterAndSortedRequest);
    this.sites = result;
  }
  // on unmount reset the store table data
  @action
  reset() {
    this.sites.items = [];
    this.sites.totalCount = 0;
  }
  @action
  async get(entityDto: EntityDto) {
    let result = await siteService.get(entityDto);
    this.editSite = result;
  }
  @action
  async createSite() {
    this.editSite = {
      siteName: '',
      siteCode: '',
      location: '',
      contactPerson: '',
      contactNumber: '',
      state: 0,
      insterState: 0,
      longitude: '',
      latitude: '',
      id: 0,
    };
  }
  @action
  async update(updateSiteInput: CreateOrUpdateSiteInput) {
    let result = await siteService.update(updateSiteInput);
    this.sites.items = this.sites.items.map((x: GetAllSiteOutput) => {
      if (x.id === updateSiteInput.id) x = result;
      return x;
    });
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default SiteStore;
