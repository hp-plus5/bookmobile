// tslint:disable:no-console
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';

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
    params: new HttpParams({}),
  };
  currentRequest = new ChartRequest();
  newResponse = new ChartResponse();
  constructor(private httpClient: HttpClient) {}

  // createGenreChart(chartRequest: ChartRequest): Observable<ChartResponse> {
  //   // call to the API. you want responses in JSON format that ngx-chart will be able to read as input data. you just want the name of genres and the count of books within each category, NOT entire books. That's what ChartDataItem is meant to be - an object with just the attributes we'd want from the database to put into charts: the dataChoice and its answer (name ['genre'] & value [4], via JSON).

  // this is incredibly loose and fast code, but maybe it'll help down the road:
  //   if (!MultiChartResponse) { // if there's only one response / only one chartResponse
  //     single[] = [
  //       this.chartResponse
  //     ];
  //   } else if (MultiChartResponse)
  //   multi[] = [
  //     chartResponse.name = this.chartResponse.name,
  //     series[] = [
  //       chartResponse.name = this.chartResponse.name,
  //     ChartResponse.value = this.chartResponse.value
  //     ];
  //   ];
  // }

  // have if(genre v author v protag) on API end and form SQL queries accordingly. Let the modularity happen there, not in our service. you'll get this information about dataChoice from currentRequest, which you can pass up as just a string, since that's all the info the API cares about.
  getChartData(): Observable<ChartResponse> {
    this.httpOptions.params = this.httpOptions.params.set(
      'groupByColumnName',
      this.currentRequest.dataChoice,
    );
    // these above lines are setting my HttpParams. The listed ones above a) aren't filled in yet upon initiation, and b) are static for the lifetime of the service, which is also the lifetime of the app. So if we were to fill them in, they couldn't be changed via variable, and they would apply to each and every call given to my API along the way. THIS is how I pass my dataChoice into my API so that it can figure out its little backend URL situation of it wanting an input along the lines of "url/?groupByColumnName=Genre".
    return this.httpClient
      .get<ChartResponse>(`${environment.apiUrl}/charts`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`fetched data`)),
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
