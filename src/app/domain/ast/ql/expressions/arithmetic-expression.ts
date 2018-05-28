import {Expression} from './expression';
import {Location} from '../../location';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export class MultiplyExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitMultiplyExpression(this);
  }
}

export class DivideExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitDivideExpression(this);
  }
}

export class AddExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitAddExpression(this);
  }
}

export class SubtractExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitSubtractExpression(this);
  }
}
