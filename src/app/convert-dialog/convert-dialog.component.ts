import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import {CoinInfoService} from '../coin-info.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms'
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DoCheck} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-convert-dialog',
  templateUrl: './convert-dialog.component.html',
  styleUrls: ['./convert-dialog.component.scss'],
  providers: [CoinInfoService]
})
export class ConvertDialogComponent implements DoCheck {
  receiveAddress= '';
  sendAddress= '';
  coinsArray = [];

  makeOrder(addressForm: NgForm) {
    // if (!order) { return; }

    this.receiveAddress = addressForm.value.receiveAddress;
    this.sendAddress = addressForm.value.sendAddress;

    this.coinInfoService.makeOrder(
      {
        "withdrawal": this.receiveAddress,
        "pair": this.data.selectedCoin1 + "_" + this.data.selectedCoin2,
        "returnAddress": this.sendAddress
      } )
      .subscribe(result => {
        // if(!result.error) {

        // } else {

        // }
        console.log('Result in component:');
        console.log(result);
        //custom code
      });
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

  constructor(
    private coinInfoService: CoinInfoService,
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<ConvertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

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

  // Calling functions from coinInfoService
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


  ngOnInit() {
    this.selectedCoin1 = this.data.selectedCoin1;
    this.selectedCoin2 = this.data.selectedCoin2;
    this.getcoins;
    this.getrate();
    this.getLimit();
    this.getMinerFee();
    this.getMinLimit();
  }


  changeDetected: boolean = false;
  oldSelectedCoin1 = this.coinInfoService.selectedCoin1;
  oldSelectedCoin2 = this.coinInfoService.selectedCoin2;

  ngDoCheck(){
    if (this.selectedCoin1 !== this.oldSelectedCoin1 || this.selectedCoin2 !== this.oldSelectedCoin2) {
      // console.log('ngDoCheck is called...');
      this.changeDetected = true;
      this.oldSelectedCoin1 = this.selectedCoin1;
      this.oldSelectedCoin2 = this.selectedCoin2;
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
}
