import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOrder } from './cash-order';

describe('CashOrder', () => {
  let component: CashOrder;
  let fixture: ComponentFixture<CashOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
