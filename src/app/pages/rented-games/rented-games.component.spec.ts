import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedGamesComponent } from './rented-games.component';

describe('RentedGamesComponent', () => {
  let component: RentedGamesComponent;
  let fixture: ComponentFixture<RentedGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentedGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
