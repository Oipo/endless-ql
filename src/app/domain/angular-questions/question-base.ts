import { FormGroup } from '@angular/forms';

export class QuestionBase<T> {
  order = 1;
  readonly = false;
  hiddenCondition: (form: FormGroup) => boolean;
  calculateValue: (form: FormGroup) => T = (() => this.value);

  constructor(readonly key: string,
              readonly label: string,
              public value: T,
              readonly type: string,
              readonly controlType: string,
              hiddenCondition: (form: FormGroup) => boolean) {
    this.hiddenCondition = hiddenCondition;
  }

  toCalculatedQuestion(calculateFunction: (form: FormGroup) => T) {
    this.calculateValue = calculateFunction;
    this.readonly = true;
  }
}
