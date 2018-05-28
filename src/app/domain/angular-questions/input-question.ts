import {QuestionBase} from './question-base';
import {Widget, WidgetType} from '../ast/qls/index';
import {FormGroup} from '@angular/forms';

export class InputQuestion extends QuestionBase<string> {
  constructor(key: string,
              label: string,
              value,
              type: string,
              hiddenCondition?: (form: FormGroup) => boolean) {
    super(key, label, value, type, 'textbox', new Widget(WidgetType.TEXT, []), hiddenCondition);
  }
}
