import { PagedFilterAndSortedRequest } from '../../dto/pagedFilterAndSortedRequest';

export interface PagedSiteResultRequestDto extends PagedFilterAndSortedRequest {
  keyword: string;
}
