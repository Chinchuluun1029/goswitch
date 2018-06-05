import { Injectable } from '@angular/core';
import { Coins } from 'src/app/coins';
import {HttpClient} from '@angular/common/http';
import { Input, Output } from '@angular/core';

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

  withdrawalValue: number = 9;
  depositValue: number = 8;
  public calcDepositValue(): void {
    this.getrate();
    // console.log(this.getrate)
    // this.depositValue = 7;
    console.log(this.depositValue)
  }
}
