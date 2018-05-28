import {Expression} from './expression';
import {QlQuestion} from '../ql-question';
import {ExpressionType} from './expression-type';
import {Location} from '../../location';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export class Variable extends Expression {
  public referencedQuestion: QlQuestion;

  constructor(public identifier: string, location: Location) {
    super(location);
  }

  getVariables(): Variable[] {
    return [this];
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    return this.referencedQuestion.getExpressionType();
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitVariable(this);
  }
}
