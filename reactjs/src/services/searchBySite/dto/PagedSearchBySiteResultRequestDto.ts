import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedSearchBySiteResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
  siteCode: string;
  startDate: string;
  endDate: string;
}
