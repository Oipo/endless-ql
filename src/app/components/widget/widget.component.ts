import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from '../../domain/angular-questions/question-base';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  control: AbstractControl;

  ngOnInit(): void {
    this.control = this.form.controls[this.question.key];

    if (this.question.readonly) {
      this.control.setValue(this.question.calculateValue(this.form));
    }

    this.form.valueChanges.subscribe(() => {
      if (this.question.readonly) {
        this.updateFormIfChanged();
      }
    });
  }

  private updateFormIfChanged() {
    const currentValue = this.control.value;
    const newValue = this.question.calculateValue(this.form);

    if (newValue !== currentValue) {
      if (this.question.type === 'number') {
        if (!Number.isNaN(newValue)) {
          this.control.setValue(newValue);
        }
      } else {
        this.control.setValue(newValue);
      }
    }
  }
}
