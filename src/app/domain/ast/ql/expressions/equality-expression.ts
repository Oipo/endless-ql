import {Expression} from './expression';
import {ExpressionType} from './expression-type';
import {Location} from '../../location';
import {QlQuestion} from '../ql-question';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export abstract class EqualityExpression extends BinaryExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    if (this.left.checkType(allQuestions) === this.right.checkType(allQuestions)) {
      return ExpressionType.BOOLEAN;
    } else {
      throw new TypeError(
        `Type of expression left is different from type of expression right `
        + this.getLocationErrorMessage()
      );
    }
  }
}

export class EqualExpression extends EqualityExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitEqualExpression(this);
  }
}

export class UnequalExpression extends EqualityExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitUnequalExpression(this);
  }
}
