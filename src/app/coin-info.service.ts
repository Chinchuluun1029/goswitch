import { Injectable } from '@angular/core';
import { Coins } from 'src/app/coins';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinInfoService {

  constructor(private httpClient: HttpClient) {
  }

  coinsArray = [];
  rateArray = 0;
  limitArray = 0;
  minerFeeArray = [];
  minLimitArray = 0;
  selectedCoin1 = 'BAT';
  selectedCoin2 = 'BCH';
  //Get coins from HTTP
 
  URL = "https://shapeshift.io";


  public getcoins = this.httpClient.get(this.URL + "/getcoins").subscribe(
    (data:any[]) => {
      data = Object.keys(data).map(i => data[i])
        for( var j = 0; j < data.length; j++) {
          if (data[j].status === "available") {
            let coinNamesArray = [];
            coinNamesArray.push(data[j].symbol)
            let coinNames = coinNamesArray.toString();
          }
        }

       this.coinsArray = data; 
    }
  );

  @Input()
  get getSelectedCoin1() {
    return this.selectedCoin1;
  }

  @Output()
  set setSelectedCoin1(value1) {
    this.selectedCoin1 = value1;
    this.getrate()
  }

  @Input()
  get getSelectedCoin2() {
    return this.selectedCoin2;
  }

  @Output()
  set setSelectedCoin2(value2) {
    this.selectedCoin2 = value2;
    this.getrate()
  }
  //TODO: input and output for withdrawal value, change its function

  @Input()
  get getWithdrawalValue() {
    return this.withdrawalValue;
  }

  @Output()
  set setWithdrawalValue(value) {
    this.withdrawalValue = value;
    this.getrate()
  }

  public getrate() {this.httpClient.get(this.URL + "/rate/" + this.selectedCoin1 + "_" + this.selectedCoin2).subscribe(
    (data: any) => {
      this.rateArray = Number(data.rate.toString());
    }
  )};

  public getMinerFee() {this.httpClient.get(this.URL + "/marketinfo/" + this.selectedCoin1 + "_" + this.selectedCoin2).subscribe(
    (data: any) => {
      this.minerFeeArray = data.minerFee;
    }
  )}

  public getMinLimit() {this.httpClient.get(this.URL + "/marketinfo/" + this.selectedCoin1 + "_" + this.selectedCoin2).subscribe(
    (data: any) => {
      this.minLimitArray = Number(data.minimum.toString());
    }
  )}
  
  public getLimit() {this.httpClient.get(this.URL + "/limit/" + this.selectedCoin1 + "_" + this.selectedCoin2).subscribe(
    (data: any) => {
      this.limitArray = Number(data.limit.toString());
    }
  )};

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  };

  makeOrder (order: any): Observable<any> {
    return this.httpClient.post<any>(this.URL+'/shift', order, this.httpOptions).pipe(
      tap((result: any) => console.log(result)),
      catchError(this.handleError<any>('makeOrder'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  withdrawalValue: number = 9;
  depositValue: number = 8;
  public calcDepositValue(): void {
    this.getrate();
    // console.log(this.getrate)
    // this.depositValue = 7;
    console.log(this.depositValue)
  }
}
