import http from '../httpService';
import { GetCheckTagOutput } from './dto/getCheckTagOutput';
import { GetImportTagOutput } from './dto/getImportTagOutput';
import { TagParamDto } from './dto/tagParamDto';

class checkTagService {
  public async getTag(tagParamDto: TagParamDto): Promise<GetCheckTagOutput> {
    let result = await http.get('api/services/app/BagService/GetTag', { params: tagParamDto });
    return result.data.result;
  }

  public async importTag(formData: any): Promise<GetImportTagOutput> {
    let result = await http.post('api/services/app/BagService/ImportBagTag', formData);
    return result.data.result;
  }
}

export default new checkTagService();
