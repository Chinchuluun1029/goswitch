import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { CoinsInfoComponent } from './coins-info/coins-info.component';
import { CoinInfoService } from 'src/app/coin-info.service';
import { CoinConverterComponent } from './coin-converter/coin-converter.component';
import { ConvertDialogComponent } from 'src/app/convert-dialog/convert-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CoinsInfoComponent,
    CoinConverterComponent,
    ConvertDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatMenuModule, 
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    FormsModule
  ],
  exports: [ConvertDialogComponent],
  providers: [CoinInfoService],
  bootstrap: [AppComponent],
  entryComponents: [ConvertDialogComponent]
})
export class AppModule { }
