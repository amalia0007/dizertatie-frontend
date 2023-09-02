import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageIconComponent } from './homepage-icon.component';

describe('HomepageIconComponent', () => {
  let component: HomepageIconComponent;
  let fixture: ComponentFixture<HomepageIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
