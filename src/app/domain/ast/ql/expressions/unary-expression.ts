import {Expression} from './expression';
import {Location} from '../../location';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export abstract class UnaryExpression extends Expression {
  constructor(public readonly right: Expression, readonly location: Location) {
    super(location);
  }
}

export class NegativeExpression extends UnaryExpression {
  constructor(readonly right: Expression, readonly location: Location) {
    super(right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitNegativeExpression(this);
  }
}

export class NegateExpression extends UnaryExpression {
  constructor(readonly right: Expression, readonly location: Location) {
    super(right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitNegateExpression(this);
  }
}
