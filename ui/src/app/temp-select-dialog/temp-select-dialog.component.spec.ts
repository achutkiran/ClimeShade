import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempSelectDialogComponent } from './temp-select-dialog.component';

describe('TempSelectDialogComponent', () => {
  let component: TempSelectDialogComponent;
  let fixture: ComponentFixture<TempSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
