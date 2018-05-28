import { Component, Input, OnInit } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import { QuestionBase } from '../../domain/angular-questions/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  control: AbstractControl;

  get isInvalid() {
    return this.control.invalid;
  }

  onCheckboxChange(event) {
    this.control.setValue(event.target.checked);
  }

  onTextboxChange(event) {
    if (this.question.type === 'number') {
      this.control.setValue(parseInt(event.target.value, 10));
    }
  }

  ngOnInit(): void {
    this.control = this.form.controls[this.question.key];
    this.updateValueIfChanged();

    // only recalculate new value if the control is an expressionQuestion
    if (this.question.readonly) {
      this.form.valueChanges.subscribe(() => {
        this.updateValueIfChanged();
      });
    }
  }

  private updateValueIfChanged(): void {
    const currentValue = this.control.value;
    let newValue = this.question.calculateValue(this.form);

    // displaying of dates is in strings, so convert it.
    if (newValue instanceof Date) {
      const date: Date = (<Date>newValue);
      newValue = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    }

    if (currentValue !== newValue) {
      if (this.question.type === 'number' && typeof(newValue) === 'number' && (!Number.isNaN(newValue))) {
        this.control.setValue(newValue);
      } else if (this.question.type === 'boolean' && typeof(newValue) === 'boolean') {
        this.question.value = newValue;
        this.control.setValue(newValue);
      } else if (this.question.type === 'text' && typeof(newValue) === 'string') {
        this.control.setValue(newValue);
      } else if (this.question.type === 'date' && typeof(newValue) === 'string') {
        this.question.value = newValue;
        this.control.setValue(newValue);
      }
    }
  }
}
