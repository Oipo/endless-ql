import {Expression} from './expression';
import {Location} from '../../location';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export class GreaterThanExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitGreaterThanExpression(this);
  }
}

export class GreaterThanEqualExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitGreaterThanEqualExpression(this);
  }
}

export class LessThanExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitLessThanExpression(this);
  }
}

export class LessThanEqualExpression extends BinaryExpression {
  constructor(readonly left: Expression, readonly right: Expression, readonly location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitLessThanEqualExpression(this);
  }
}


