import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserContactDialogComponent } from './edit-user-contact-dialog.component';

describe('EditUserContactDialogComponent', () => {
  let component: EditUserContactDialogComponent;
  let fixture: ComponentFixture<EditUserContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserContactDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
