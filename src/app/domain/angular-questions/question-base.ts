import { FormGroup } from '@angular/forms';
import {Widget, WidgetType} from '../ast/qls/index';

export class QuestionBase<T> {
  order = 1;
  readonly = false;
  style: {[key: string]: string};
  hiddenCondition: (form: FormGroup) => boolean;
  calculateValue: (form: FormGroup) => T = (() => this.value);
  widget: Widget;

  constructor(readonly key: string,
              readonly label: string,
              public value: T,
              readonly type: string,
              readonly controlType: string,
              widget: Widget,
              hiddenCondition: (form: FormGroup) => boolean) {
    this.hiddenCondition = hiddenCondition || (() => true);
    this.widget = widget || new Widget(WidgetType.TEXT, []);
  }

  toCalculatedQuestion(calculateFunction: (form: FormGroup) => T) {
    this.calculateValue = calculateFunction;
    this.readonly = true;
  }
}
