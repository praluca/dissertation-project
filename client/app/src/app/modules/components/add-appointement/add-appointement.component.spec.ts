import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointementComponent } from './add-appointement.component';

describe('AddAppointementComponent', () => {
  let component: AddAppointementComponent;
  let fixture: ComponentFixture<AddAppointementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppointementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
