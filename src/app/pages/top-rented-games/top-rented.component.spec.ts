import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRentedComponent } from './top-rented.component';

describe('TopRentedComponent', () => {
  let component: TopRentedComponent;
  let fixture: ComponentFixture<TopRentedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRentedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
