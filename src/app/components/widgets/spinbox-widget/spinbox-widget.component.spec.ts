import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinboxWidgetComponent } from './spinbox-widget.component';
import {MaterialModule} from '../../../material.module';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SpinboxWidgetComponent', () => {
  let component: SpinboxWidgetComponent;
  let fixture: ComponentFixture<SpinboxWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ SpinboxWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinboxWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse the input to a number and change the value of the form control', () => {
    component.control = new FormControl();
    component.label = 'label';
    fixture.detectChanges();

    expect(component.control.value).toBe(null);

    component.onNumberChange({target: {value: '12'}});
    expect(component.control.value).toBe(12);
  });
});
