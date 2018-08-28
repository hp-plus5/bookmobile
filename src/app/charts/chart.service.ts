// tslint:disable:no-console
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ChartRequest, ChartType, DataChoice } from '@app/charts/_models/chart-request';
import { ChartResponse } from '@app/charts/_models/chart-response';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'authkey',
      userid: '1',
    }),
    params: new HttpParams({
      fromString: 'value',
    }),
  };
  currentRequest = new ChartRequest();
  newResponse = new ChartResponse();
  chartsApiUrl = '/api/chart';
  constructor(private httpClient: HttpClient) {}

  /**
   *  I need methods here that:
   * .pull Chart (from model) attributes concerning:
   *   chartType ... dataChoice
   *      and change them according to which choice on the template is selected by the user. which means i need an {{attribute}}, meaning i need an ngModel in my form, but i still need to make sure that the weight of the submit isn't chosen until the user select 'submit', just as in my books-detail component.
   */
  // createGenreChart(chartRequest: ChartRequest): Observable<ChartResponse> {
  //   // call to the API. you want responses in JSON format that ngx-chart will be able to read as input data. you just want the name of genres and the count of books within each category, NOT entire books. That's what ChartResponse is meant to be - an object with just the attributes we'd want from the database to put into charts. Ideally, this would be modular for accessing different data, but dreams don't always come true.
  //   if (ChartResponse) { // if there's only one response
  //     single[] = [
  //       this.chartResponse
  //     ];
  //   } // else if there's MORE THAN ONE
  //   multi[] = [
  //     chartResponse.name = this.chartResponse.name,
  //     series[] = [
  //       chartResponse.name = this.chartResponse.name,
  //     ChartResponse.value = this.chartResponse.value
  //     ];
  //   ];
  // }

  // have if(genre v author v protag) on API end and form SQL queries accordingly. Let the modularity happen there, not in our service. you'll get this information about dataChoice from currentRequest, which you can pass up as just a string, since that's all the info the API cares about.
  getChartData(currentRequest: ChartRequest): Observable<ChartResponse> {
    const url = `${this.chartsApiUrl}/?groupByColumnName=${
      currentRequest.dataChoice
    }}`;
    return this.httpClient.get<ChartResponse>(url, this.httpOptions).pipe(
      tap(chartResponse => this.log(`fetched data`)),
      // map(chartResponse => chartResponse.map(chartResponse => new ChartResponse(chartResponse))),
      catchError(this.handleError('getChartData', [])),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T[] | T) {
    return (error: any): Observable<T> => {
      console.error(error + operation);

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log('ChartService: ' + message);
    // this is code Beth is writing to supplant a messageService she didn't want to use
  }
}
