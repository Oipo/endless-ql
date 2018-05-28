import {Expression} from './expression';
import {Location} from '../../location';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export class AndExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitAndExpression(this);
  }
}

export class OrExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitOrExpression(this);
  }
}
