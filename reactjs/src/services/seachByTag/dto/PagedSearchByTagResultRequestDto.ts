import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedSearchByTagResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
  bagNumber: string;
  startDate: string;
  endDate: string;
}
