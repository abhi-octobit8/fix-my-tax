import { action } from 'mobx';

import userService from '../services/user/userService';
import { CreateHelpInput } from '../services/help/dto/createHelpInput';
import helpService from '../services/help/helpService';

class HelpStore {
  @action
  async create(createHelpInput: CreateHelpInput) {
    let result = await helpService.create(createHelpInput);
    console.log('help response', result);
  }

  async changeLanguage(languageName: string) {
    await userService.changeLanguage({ languageName: languageName });
  }
}

export default HelpStore;
