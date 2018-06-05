import { Injectable } from '@angular/core';
import {ConvertDialogComponent} from "./convert-dialog/convert-dialog.component";
import { Input, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcDepositValueService {

  constructor(public convertDialog: ConvertDialogComponent
  ) {}

  ngOnInit() {
    console.log(this.withdrawalValue);
    console.log('HELLOWORLD')
  }
  withdrawalValue = this.convertDialog.withdrawalValue;
  depositValue = this.convertDialog.depositValue;


  @Input()
  get getWithdrawalValue() {
    return this.withdrawalValue;
  } 
  @Output() 
  set setWithdrawalValue(value) {
    this.withdrawalValue = value;
    this.calcDepositValue();
  }
  @Input()
  get getDepositValue() {
    return this.depositValue;
  } 
  @Output() 
  set setDepositValue(value) {
    this.depositValue = value;
    this.calcDepositValue();
  }

  calcDepositValue(): void {
    // console.log(this.getrate)
    console.log('HELLOWORLD');
    this.withdrawalValue = this.depositValue * 5;
  }
}
