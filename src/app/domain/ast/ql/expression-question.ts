import {QuestionBase} from '../../angular-questions/question-base';
import {FormGroup} from '@angular/forms';
import {QuestionType} from '../question-type';
import {QlQuestion} from './ql-question';
import {Location} from '../location';
import {Expression} from './expressions/expression';
import {ExpressionType, ExpressionTypeUtil} from './expressions/expression-type';
import {CircularDependencyError} from '../../errors';
import * as _ from 'lodash';
import {Variable} from './expressions/variable';
import {QuestionFactory} from '../../../factories/question-factory';
import {EvaluateExpressionVisitor} from './visitors/evaluate-expression-visitor';

export class ExpressionQuestion extends QlQuestion {
  constructor(name: string, label: string, type: QuestionType<any>, readonly expression: Expression, location: Location) {
    super(name, label, type, location);
  }

  getVariables(): Variable[] {
    return this.expression.getVariables();
  }

  checkType(allQuestions: QlQuestion[]): void {
    const expressionType = this.expression.checkType(allQuestions);
    if (! this.expressionTypeValidForQuestion(expressionType)) {
      throw new TypeError(`Expression type ${ExpressionTypeUtil.toString(expressionType)} ` +
        `incompatible with question type ${this.type.toString()}`
      + this.getLocationErrorMessage());
    }
  }

  checkDependencies(): void {
    const circularDependency = _.find(this.expression.getVariables(), ['identifier', this.name]);
    if (circularDependency) {
      throw new CircularDependencyError(`The expression of question ${this.name} references to itself`);
    }
  }

  toFormQuestion(formQuestions: ReadonlyArray<QuestionBase<any>>,
                 condition?: (form: FormGroup) => boolean): ReadonlyArray<QuestionBase<any>> {

    const question = QuestionFactory.toFormQuestion(this.name, this.label, this.type, condition);
    question.toCalculatedQuestion((form: FormGroup) => {
      return EvaluateExpressionVisitor.evaluate(form, this.expression).getValue();
    });
    return [question];
  }

  expressionTypeValidForQuestion(expressionType: ExpressionType): boolean {
    return this.type.isCompatibleWithExpression(expressionType);
  }
}
