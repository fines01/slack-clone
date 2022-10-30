import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustStatusComponent } from './adjust-status.component';

describe('AdjustStatusComponent', () => {
  let component: AdjustStatusComponent;
  let fixture: ComponentFixture<AdjustStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
