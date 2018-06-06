import { Component } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDialog} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClient} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { CoinInfoService } from 'src/app/coin-info.service';
import { Input, Output } from '@angular/core';
import { OnChanges, SimpleChanges, DoCheck, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {ConvertDialogComponent} from "./convert-dialog/convert-dialog.component";
import {MatDialogModule} from '@angular/material/dialog';
import {OnDestroy} from '@angular/core';
import { CalcDepositValueService } from 'src/app/calc-deposit-value.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CoinInfoService, CalcDepositValueService]
})

export class AppComponent implements DoCheck {
  coinsArray = [];
  limitArray = this.coinInfoService.limitArray;
  rateArray = this.coinInfoService.rateArray;

  minerFeeArray = this.coinInfoService.minerFeeArray;
  minLimitArray = this.coinInfoService.minLimitArray;

  URL = this.coinInfoService.URL;
  panelOpenState: boolean = false;
  selectedCoin1 = this.coinInfoService.selectedCoin1;
  selectedCoin2 = this.coinInfoService.selectedCoin2;

  getrate = this.coinInfoService.getrate;
  getLimit = this.coinInfoService.getLimit;
  getMinerFee = this.coinInfoService.getMinerFee;
  getMinLimit = this.coinInfoService.getMinLimit;

  calcDepositValue = this.coinInfoService.calcDepositValue;

  constructor (public coinInfoService: CoinInfoService,
               private _dialog: MatDialog,
               public dialog: MatDialog,
               private httpClient: HttpClient
              ) {}
      
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

  // Calling functions from coinInfoService

  ngOnInit() {
    this.getcoins;
    this.getrate();
    this.getLimit();
    this.getMinerFee();
    this.getMinLimit();
    this.calcDepositValue();
  }


  changeDetected: boolean = false;
  oldSelectedCoin1 = this.coinInfoService.selectedCoin1;
  oldSelectedCoin2 = this.coinInfoService.selectedCoin2;
  oldWithdrawalValue = this.coinInfoService.withdrawalValue;
  ngDoCheck(){
    if (this.selectedCoin1 !== this.oldSelectedCoin1 || this.selectedCoin2 !== this.oldSelectedCoin2) {
      // console.log('ngDoCheck is called...');
      this.changeDetected = true;
      this.oldSelectedCoin1 = this.selectedCoin1;
      this.oldSelectedCoin2 = this.selectedCoin2;
    }

    if(this.oldWithdrawalValue !== this.coinInfoService.withdrawalValue){
      this.changeDetected = true;
      this.oldWithdrawalValue = this.coinInfoService.withdrawalValue;
    }

    if(this.changeDetected) {
      console.log("Change detected...");
      this.getrate();
      this.getLimit();
      this.getMinerFee();
      this.getMinLimit();
      this.changeDetected = false;
    }
  }

  select: any = "HELLO";

    // Dialog Module
  openDialog(): void {
    let dialogRef = this.dialog.open(ConvertDialogComponent, {
      width: '500px',
      data: { selectedCoin1: this.selectedCoin1, selectedCoin2: this.selectedCoin2, select: this.select }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    });

    console.log('openDialog activated..')
    this.selectedCoin1 = this.oldSelectedCoin1;
    this.changeDetected = true;
  }

  makeOrder(): void {
    // if (!order) { return; }
    this.coinInfoService.makeOrder(
      {
        "withdrawal":"Lfhs2X5zZP8pW8TT42PQwZeSf4cBtYgkon",
        "pair":"ltc_btc",
        "returnAddress":"1Jg6hzPUzKbwKiUDo1UWLZYuXuEdbqwX9v"
      })
      .subscribe(result => {
        if(!result.error) {

        } else {
          
        }
        console.log('Result in component:');
        console.log(result);
        //custome code
      });
  }
}

