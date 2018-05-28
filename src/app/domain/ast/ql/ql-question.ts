import {QuestionBase} from '../../angular-questions/question-base';
import {FormGroup} from '@angular/forms';
import {QuestionType} from '../question-type';
import {Statement} from './statement';
import {Location} from '../location';
import {QuestionFactory} from '../../../factories/question-factory';
import {ExpressionType} from './expressions/expression-type';

export class QlQuestion extends Statement {
  constructor(readonly name: string,
              readonly label: string,
              readonly type: QuestionType<any>,
              location: Location) {
    super(location);
  }

  getQuestions(): QlQuestion[] {
    return [this];
  }

  toFormQuestion(formQuestions: ReadonlyArray<QuestionBase<any>>,
                 condition?: (form: FormGroup) => boolean): ReadonlyArray<QuestionBase<any>> {
    return [QuestionFactory.toFormQuestion(this.name, this.label, this.type, condition)];
  }

  getExpressionType(): ExpressionType {
    return this.type.toExpressionType();
  }
}
