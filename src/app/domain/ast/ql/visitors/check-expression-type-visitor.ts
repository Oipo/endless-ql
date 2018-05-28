import {ExpressionVisitor} from './expression-visitor';
import {
  AddExpression, AndExpression, BooleanLiteral, DateLiteral, DivideExpression, EqualExpression,
  GreaterThanEqualExpression,
  GreaterThanExpression,
  LessThanEqualExpression,
  LessThanExpression,
  MultiplyExpression, NegateExpression, NegativeExpression,
  NumberLiteral, OrExpression,
  StringLiteral, SubtractExpression, UnequalExpression, Variable
} from '../';
import {ExpressionType, ExpressionTypeUtil} from '../expressions/expression-type';
import {Location, locationToReadableMessage} from '../../location';
import {Expression} from '../index';

export class CheckExpressionTypeVisitor implements ExpressionVisitor<ExpressionType> {
  private constructor() { }

  static evaluate(expression: Expression): ExpressionType {
    const visitor = new CheckExpressionTypeVisitor();
    return expression.accept(visitor);
  }

  visitBooleanLiteral(literal: BooleanLiteral): ExpressionType {
    return literal.getType();
  }

  visitNumberLiteral(literal: NumberLiteral): ExpressionType {
    return literal.getType();
  }

  visitStringLiteral(literal: StringLiteral): ExpressionType {
    return literal.getType();
  }

  visitDateLiteral(literal: DateLiteral): ExpressionType {
    return literal.getType();
  }

  visitMultiplyExpression(expression: MultiplyExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return typeLeft;
  }

  visitDivideExpression(expression: DivideExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return typeLeft;
  }

  visitAddExpression(expression: AddExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER ||
        typeLeft === ExpressionType.DATE && typeRight === ExpressionType.NUMBER ||
        typeLeft === typeRight && typeLeft === ExpressionType.STRING;
    }, typeLeft, typeRight, expression.location);

    return typeLeft;
  }

  visitSubtractExpression(expression: SubtractExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER ||
        typeLeft === ExpressionType.DATE && typeRight === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return typeLeft;
  }

  visitGreaterThanExpression(expression: GreaterThanExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return ExpressionType.BOOLEAN;
  }

  visitGreaterThanEqualExpression(expression: GreaterThanEqualExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return ExpressionType.BOOLEAN;
  }

  visitLessThanExpression(expression: LessThanExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return ExpressionType.BOOLEAN;
  }

  visitLessThanEqualExpression(expression: LessThanEqualExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.NUMBER;
    }, typeLeft, typeRight, expression.location);

    return ExpressionType.BOOLEAN;
  }

  visitEqualExpression(expression: EqualExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight;
    }, typeLeft, typeRight, expression.location);

    return ExpressionType.BOOLEAN;
  }

  visitUnequalExpression(expression: UnequalExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight;
    }, typeLeft, typeRight, expression.location);

    return ExpressionType.BOOLEAN;
  }

  visitAndExpression(expression: AndExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.BOOLEAN;
    }, typeLeft, typeRight, expression.location);

    return typeLeft;
  }

  visitOrExpression(expression: OrExpression): ExpressionType {
    const typeLeft = expression.left.accept(this);
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowBinary(() => {
      return typeLeft === typeRight && typeLeft === ExpressionType.BOOLEAN;
    }, typeLeft, typeRight, expression.location);

    return typeLeft;
  }

  visitNegativeExpression(expression: NegativeExpression): ExpressionType {
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowUnary(() => {
      return typeRight === ExpressionType.NUMBER;
    }, typeRight, expression.location);

    return typeRight;
  }

  visitNegateExpression(expression: NegateExpression): ExpressionType {
    const typeRight = expression.right.accept(this);

    this.checkConditionOrThrowUnary(() => {
      return typeRight === ExpressionType.BOOLEAN;
    }, typeRight, expression.location);

    return typeRight;
  }

  visitVariable(expression: Variable): ExpressionType {
    return expression.getExpressionType();
  }

  private checkConditionOrThrowBinary(condition: () => boolean, typeLeft: ExpressionType, typeRight: ExpressionType, location: Location) {
    if (!condition()) {
      throw new TypeError(
        `Type of expressionession left(${ExpressionTypeUtil.toString(typeLeft)}) is ` +
        `different from type of expressionession right (${ExpressionTypeUtil.toString(typeRight)})`
        + locationToReadableMessage(location)
      );
    }
  }

  private checkConditionOrThrowUnary(condition: () => boolean, typeRight: ExpressionType, location: Location) {
    if (!condition()) {
      throw new TypeError(
        `Type of expression (${ExpressionTypeUtil.toString(typeRight)}) does not match operator`
        + locationToReadableMessage(location)
      );
    }
  }
}
