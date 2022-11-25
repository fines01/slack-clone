import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadContainerComponent } from './thread.component';

describe('ThreadContainerComponent', () => {
  let component: ThreadContainerComponent;
  let fixture: ComponentFixture<ThreadContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
