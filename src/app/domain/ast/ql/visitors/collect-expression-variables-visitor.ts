import {ExpressionVisitor} from './expression-visitor';
import {
  AddExpression, AndExpression,
  BooleanLiteral, DateLiteral, DivideExpression, EqualExpression, Expression, GreaterThanEqualExpression,
  GreaterThanExpression,
  LessThanEqualExpression,
  LessThanExpression,
  MultiplyExpression, NegateExpression, NegativeExpression, NumberLiteral, OrExpression,
  StringLiteral, SubtractExpression, UnequalExpression, Variable
} from '../index';

export class CollectExpressionVariablesVisitor implements ExpressionVisitor<void> {
  private variables: Variable[];
  private constructor() {
    this.variables = [];
  }

  static evaluate(expression: Expression): ReadonlyArray<Variable> {
    const visitor = new CollectExpressionVariablesVisitor();
    expression.accept(visitor);
    return visitor.variables;
  }

  visitBooleanLiteral(literal: BooleanLiteral): void {
    // nothing to do
  }

  visitNumberLiteral(literal: NumberLiteral): void {
    // nothing to do
  }

  visitStringLiteral(literal: StringLiteral): void {
    // nothing to do
  }

  visitDateLiteral(literal: DateLiteral): void {
    // nothing to do
  }

  visitMultiplyExpression(expression: MultiplyExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitDivideExpression(expression: DivideExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitAddExpression(expression: AddExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitSubtractExpression(expression: SubtractExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitGreaterThanExpression(expression: GreaterThanExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitGreaterThanEqualExpression(expression: GreaterThanEqualExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitLessThanExpression(expression: LessThanExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitLessThanEqualExpression(expression: LessThanEqualExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitEqualExpression(expression: EqualExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitUnequalExpression(expression: UnequalExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitAndExpression(expression: AndExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitOrExpression(expression: OrExpression): void {
    expression.left.accept(this);
    expression.right.accept(this);
  }

  visitNegativeExpression(expression: NegativeExpression): void {
    expression.right.accept(this);
  }

  visitNegateExpression(expression: NegateExpression): void {
    expression.right.accept(this);
  }

  visitVariable(expression: Variable): void {
    this.variables.push(expression);
  }

}
