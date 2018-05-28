import {QuestionBase} from './question-base';
import {FormGroup} from '@angular/forms';

export class DateQuestion extends QuestionBase<string> {
  constructor(key: string,
              label: string,
              value,
              type: string,
              hiddenCondition: (form: FormGroup) => boolean) {
    super(key, label, value, type, 'date', hiddenCondition);
  }
}
