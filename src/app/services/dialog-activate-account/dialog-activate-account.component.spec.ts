import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DialogActivateAccountComponent} from './dialog-activate-account.component';


describe('DialogActivateAccountComponent', () => {
  let component: DialogActivateAccountComponent;
  let fixture: ComponentFixture<DialogActivateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogActivateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
