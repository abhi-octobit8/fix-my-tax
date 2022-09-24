import http from '../httpService';
import { CreateHelpInput } from './dto/createHelpInput';

class HelpService {
  public async create(createHelpInput: CreateHelpInput) {
    let result = await http.post('api/services/app/HelpService/Create', createHelpInput);
    return result.data.result;
  }
}

export default new HelpService();
