import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalInformationsComponent } from './vital-informations.component';

describe('VitalInformationsComponent', () => {
  let component: VitalInformationsComponent;
  let fixture: ComponentFixture<VitalInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalInformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
