export class ChartRequest {
  chartType: ChartType = 'advancedPieChart';
  chartDataChoice: ChartDataChoice = 'genre';
  constructor(chartObject?: ChartRequest) {
    /* the purpose of the structure below is to emphasize a negative case assumption rather than a "happy case" assumption.
    This keeps your code from spiraling to the right and make it easier to read. the "real work" should be at the very end. */
    if (!chartObject) {
      return;
    }
    this.chartType = chartObject.chartType;
    this.chartDataChoice = chartObject.chartDataChoice;
  }
}

export type ChartType = 'advancedPieChart' | 'pieChart' | 'verticalBarChart';

export type ChartDataChoice = 'genre' | 'author' | 'protagonist';
