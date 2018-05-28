import {ExpressionType} from './expression-type';
import {Expression} from './expression';
import {Location} from '../../location';
import {QlQuestion} from '../ql-question';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export abstract class ComparisonExpression extends BinaryExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    if (this.left.checkType(allQuestions) === this.right.checkType(allQuestions) &&
      this.left.checkType(allQuestions) === ExpressionType.NUMBER) {
      return ExpressionType.BOOLEAN;
    } else {
      throw new TypeError(
        `Type of expression left is different from type of expression right `
        + this.getLocationErrorMessage()
      );
    }
  }
}

export class GreaterThanExpression extends ComparisonExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitGreaterThanExpression(this);
  }
}

export class GreaterThanEqualExpression extends ComparisonExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitGreaterThanEqualExpression(this);
  }
}

export class LessThanExpression extends ComparisonExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitLessThanExpression(this);
  }
}

export class LessThanEqualExpression extends ComparisonExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitLessThanEqualExpression(this);
  }
}


