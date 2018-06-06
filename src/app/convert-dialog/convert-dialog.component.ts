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
// import {DoCheck} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-convert-dialog',
  templateUrl: './convert-dialog.component.html',
  styleUrls: ['./convert-dialog.component.scss'],
  providers: [CoinInfoService]
})
export class ConvertDialogComponent {
  receiveAddress= '';
  sendAddress= '';
  pair1 = 'ltc';
  pair2 = 'btc';


  makeOrder(addressForm: NgForm) {
    // if (!order) { return; }

    this.receiveAddress = addressForm.value.receiveAddress;
    this.sendAddress = addressForm.value.sendAddress;

    console.log(this.data.selectedCoin1)
    console.log(this.data.selectedCoin2)

    this.coinInfoService.makeOrder(
      {
        "amount": 0.5,
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
    public dialogRef: MatDialogRef<ConvertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    rateArray = this.coinInfoService.rateArray;
    getrate = this.coinInfoService.getrate;

    // ngDoCheck(){
    //     if(this.oldDepositValue !== this.depositValue) {
    //       this.changeDetected = true;
    //     }
    //     if(this.changeDetected){
    //       this.calcDepositValue();
    //       console.log('Change detected to true');
    //       this.oldDepositValue = this.depositValue;
    //     }
    // }

    
    // ngDoCheck(){
    //   if (this.selectedCoin1 !== this.oldSelectedCoin1 || this.selectedCoin2 !== this.oldSelectedCoin2) {
    //     // console.log('ngDoCheck is called...');
    //     this.changeDetected = true;
    //     this.oldSelectedCoin1 = this.selectedCoin1;
    //     this.oldSelectedCoin2 = this.selectedCoin2;
    //   }
  
    //   if(this.changeDetected) {
    //     console.log("Change detected...");
    //     this.getrate();
    //     this.getLimit();
    //     this.getMinerFee();
    //     this.getMinLimit();
    //     this.changeDetected = false;
    //   }
    // }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
