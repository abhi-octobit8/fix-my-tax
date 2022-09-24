export interface GetDayWiseScanCount {
  count: number;
  scanDate: string;
  scanFormattedViewDate: string | moment.Moment;
}
