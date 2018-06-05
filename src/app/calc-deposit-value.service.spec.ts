import { TestBed, inject } from '@angular/core/testing';

import { CalcDepositValueService } from './calc-deposit-value.service';

describe('CalcDepositValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcDepositValueService]
    });
  });

  it('should be created', inject([CalcDepositValueService], (service: CalcDepositValueService) => {
    expect(service).toBeTruthy();
  }));
});
