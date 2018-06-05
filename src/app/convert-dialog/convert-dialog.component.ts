import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import {CoinInfoService} from '../coin-info.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Input, Output } from '@angular/core';
import {DoCheck} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-convert-dialog',
  templateUrl: './convert-dialog.component.html',
  styleUrls: ['./convert-dialog.component.scss'],
  providers: [CoinInfoService]
})
export class ConvertDialogComponent implements DoCheck {


  constructor(
    private coinInfoService: CoinInfoService,
    public dialogRef: MatDialogRef<ConvertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.calcDepositValue();
    }
    rateArray = this.coinInfoService.rateArray;
    getrate = this.coinInfoService.getrate;

    name: string = "";
    receivingWallet: string = "";
    sendingWallet: string = "";
    depositValue: number = 8;
    oldDepositValue: number = this.depositValue;
    changeDetected: boolean = false;
    withdrawalValue: number;
    //TODO: change multiplier by the shapeshift rate
    calcDepositValue(): void {
      // console.log(this.getrate)
      this.withdrawalValue = this.depositValue * this.rateArray;
    }
    ngOnInit(){
      console.log('on init initialised');
    }
    ngDoCheck(){
        if(this.oldDepositValue !== this.depositValue) {
          this.changeDetected = true;
          console.log("Hello there")
        }
        if(this.changeDetected){
          console.log('Change detected to true')
        }
    }

    
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

  @Input()
  get getSendingWallet() {
    return this.sendingWallet;
  }
  @Output() 
  set setSendingWallet(value1) {
    this.sendingWallet = value1;
    this.sendCoins();
  }


  sendCoins(): void {
    this.sendingWallet = this.setSendingWallet;
    console.log(this.sendingWallet)
  }

}
