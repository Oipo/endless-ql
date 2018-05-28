import {ExpressionType, ExpressionTypeUtil} from './expression-type';
import {Expression} from './expression';
import {Location} from '../../location';
import {QlQuestion} from '../ql-question';
import {BinaryExpression} from './binary-expression';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export abstract class ArithmeticExpression extends BinaryExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    const typeLeft = this.left.checkType(allQuestions);
    const typeRight = this.right.checkType(allQuestions);

    if (typeLeft === typeRight &&
        typeLeft === ExpressionType.NUMBER) {
      return typeLeft;
    } else {
      throw new TypeError(
        `Type of expression left(${ExpressionTypeUtil.toString(typeLeft)}) is` +
        `different from type of expression right (${ExpressionTypeUtil.toString(typeRight)})`
        + this.getLocationErrorMessage()
      );
    }
  }
}

export class MultiplyExpression extends ArithmeticExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitMultiplyExpression(this);
  }
}

export class DivideExpression extends ArithmeticExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitDivideExpression(this);
  }
}

export class AddExpression extends ArithmeticExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitAddExpression(this);
  }
}

export class SubtractExpression extends ArithmeticExpression {
  constructor(left: Expression, right: Expression, location: Location) {
    super(left, right, location);
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitSubtractExpression(this);
  }
}
