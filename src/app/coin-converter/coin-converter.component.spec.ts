import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinConverterComponent } from './coin-converter.component';

describe('CoinConverterComponent', () => {
  let component: CoinConverterComponent;
  let fixture: ComponentFixture<CoinConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
