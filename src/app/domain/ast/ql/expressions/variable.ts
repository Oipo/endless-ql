import {Expression} from './expression';
import {QlQuestion} from '../ql-question';
import {Location} from '../../location';
import {ExpressionVisitor} from '../visitors/expression-visitor';
import {ExpressionType} from './expression-type';

export class Variable extends Expression {
  public referencedQuestion: QlQuestion;

  constructor(public readonly identifier: string, location: Location) {
    super(location);
  }

  getExpressionType(): ExpressionType {
    return this.referencedQuestion.getExpressionType();
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitVariable(this);
  }
}
