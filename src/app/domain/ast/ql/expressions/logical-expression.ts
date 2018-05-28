import {ExpressionType} from './expression-type';
import {Expression} from './expression';
import {Location} from '../../location';
import {QlQuestion} from '../ql-question';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export abstract class LogicalExpression extends BinaryExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    if (this.left.checkType(allQuestions) === ExpressionType.BOOLEAN &&
      this.right.checkType(allQuestions) === ExpressionType.BOOLEAN) {
      return ExpressionType.BOOLEAN;
    } else {
      throw new TypeError(
        `The logical expression can only compare boolean expressions`
        + this.getLocationErrorMessage()
      );
    }
  }
}

export class AndExpression extends LogicalExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitAndExpression(this);
  }
}

export class OrExpression extends LogicalExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitOrExpression(this);
  }
}
