import { action, observable } from 'mobx';

import userService from '../services/user/userService';
import checkTagService from '../services/check-tag/checkTagService';
import { TagParamDto } from '../services/check-tag/dto/tagParamDto';
import { GetCheckTagOutput } from '../services/check-tag/dto/getCheckTagOutput';

class CheckTagStore {
  @observable tagData!: GetCheckTagOutput;

  @action
  async get(tagParamDto: TagParamDto) {
    let result = await checkTagService.getTag(tagParamDto);
    this.tagData = result;
  }

  @action
  async importTag(formData: any) {
    return await checkTagService.importTag(formData);
  }
  // on unmount reset
  @action
  reset() {
    this.tagData = {
      bagNumber: '',
      epcNumber: '',
      creationTime: '',
    };
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default CheckTagStore;
