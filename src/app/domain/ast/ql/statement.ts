import {QuestionBase} from '../../angular-questions/question-base';
import {FormGroup} from '@angular/forms';
import {QlQuestion} from './ql-question';
import {Location} from '../location';
import {LiteralType} from './expressions/expression';
import {Variable} from './expressions/variable';

  export abstract class Statement {
  constructor(readonly location: Location) {}

  abstract toFormQuestion(formQuestions: ReadonlyArray<QuestionBase<any>>,
                          condition?: (form: FormGroup) => LiteralType): ReadonlyArray<QuestionBase<any>>;
  abstract getQuestions(): QlQuestion[];

  getVariables(): Variable[] {
    return [];
  }

  checkType(allQuestions: QlQuestion[]): void {
    return;
  }

  checkDependencies(): void {
    return;
  }

  protected getLocationErrorMessage(): string {
    return ` between line ${this.location.start.line}` +
      ` and col ${this.location.start.column} and line ${this.location.end.line} and col ${this.location.end.column}`;
  }
}
