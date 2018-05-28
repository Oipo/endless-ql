import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledFormContentComponent } from './styled-form-content.component';
import {MaterialModule} from '../../material.module';
import {DynamicFormQuestionComponent} from '../dynamic-form-question/dynamic-form-question.component';
import {ReactiveFormsModule} from '@angular/forms';
import {WidgetComponent} from '../widget/widget.component';

describe('StyledFormContentComponent', () => {
  let component: StyledFormContentComponent;
  let fixture: ComponentFixture<StyledFormContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyledFormContentComponent, DynamicFormQuestionComponent, WidgetComponent],
      imports: [MaterialModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledFormContentComponent);
    component = fixture.componentInstance;
    component.questions = [];
    component.styles = undefined;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
