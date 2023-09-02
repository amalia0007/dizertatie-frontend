import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentChartComponent } from './rent-chart.component';

describe('RentChartComponent', () => {
  let component: RentChartComponent;
  let fixture: ComponentFixture<RentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
