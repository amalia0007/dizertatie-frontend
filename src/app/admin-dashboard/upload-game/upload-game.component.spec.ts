import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGameComponent } from './upload-game.component';

describe('UploadGameComponent', () => {
  let component: UploadGameComponent;
  let fixture: ComponentFixture<UploadGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
