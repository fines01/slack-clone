import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveImgDialogComponent } from './remove-img-dialog.component';

describe('RemoveImgDialogComponent', () => {
  let component: RemoveImgDialogComponent;
  let fixture: ComponentFixture<RemoveImgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveImgDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveImgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
