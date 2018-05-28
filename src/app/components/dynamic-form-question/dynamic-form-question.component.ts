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
    return this.form.controls[this.question.key].invalid;
  }

  onCheckboxChange(question: QuestionBase<any>, event) {
    this.form.controls[this.question.key].setValue(event.target.checked);
  }

  onTextboxChange(question: QuestionBase<any>, event) {
    if (question.type === 'number') {
      this.form.controls[this.question.key].setValue(parseInt(event.target.value, 10));
    }
  }

  ngOnInit(): void {
    this.control = this.form.controls[this.question.key];
    this.form.valueChanges.subscribe(() => {
      if (this.question.readonly) {
        // only recalculate new value if the control is an expressionQuestion, values are different and value is a valid value
        const currentValue = this.control.value;
        const newValue = this.question.calculateValue(this.form);
        if (currentValue !== newValue && !Number.isNaN(newValue)) {
          this.control.setValue(newValue);
        }
      }
    });
  }
}
