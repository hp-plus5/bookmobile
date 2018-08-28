export class ChartDataItem {
  name!: string | boolean;
  value = 1;

  constructor(chartDataItemObject?: ChartDataItem) {
    /* the purpose of the structure below is to emphasize a negative case assumption rather than a "happy case" assumption.
  This keeps your code from spiraling to the right and make it easier to read. the "real work" should be at the very end. */
    if (!chartDataItemObject) {
      return;
    }
    this.name = chartDataItemObject.name;
    this.value = chartDataItemObject.value;
  }
}
