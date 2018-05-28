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
  }

  onNumberChange(question: QuestionBase<any>, event) {
    if (question.type === 'number') {
      this.form.controls[this.question.key].setValue(parseInt(event.target.value, 10));
    }
  }
}
