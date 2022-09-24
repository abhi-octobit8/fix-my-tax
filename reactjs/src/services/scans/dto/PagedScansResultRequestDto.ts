import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedScansResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
  filter :string
}
