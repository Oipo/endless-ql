import {QuestionBase} from './question-base';
import {Widget} from '../ast/qls';
import {FormGroup} from '@angular/forms';

export class StyledQuestion<T> extends QuestionBase<T> {
  constructor(key: string,
              label: string,
              value: T,
              type: string,
              controlType: string,
              hiddenCondition: (form: FormGroup) => boolean,
              readonly widget: Widget,
              readonly style: {[key: string]: string}
              ) {
    super(key, label, value, type, controlType, hiddenCondition);

  }
}
