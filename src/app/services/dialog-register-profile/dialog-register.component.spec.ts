import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DialogBannedComponent} from '../dialog-banned/dialog-banned.component';


describe('DialogBannedComponent', () => {
  let component: DialogBannedComponent;
  let fixture: ComponentFixture<DialogBannedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBannedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
