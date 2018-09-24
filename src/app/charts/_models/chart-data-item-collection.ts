import { ChartDataItem } from '@app/charts/_models/chart-data-item';

export class ChartDataItemCollection {
  name: '' | undefined;
  series: ChartDataItem[] = [];
  constructor(chartDataItemCollectionObject?: ChartDataItemCollection) {
    /* the purpose of the structure below is to emphasize a negative case assumption rather than a "happy case" assumption.
    This keeps your code from spiraling to the right and make it easier to read. the "real work" should be at the very end. */
    if (!chartDataItemCollectionObject) {
      return;
    }
    this.name = chartDataItemCollectionObject.name;
    this.series = chartDataItemCollectionObject.series;
  }
}
