import {AddExpression, DivideExpression, MultiplyExpression, SubtractExpression} from '../expressions/arithmetic-expression';
import {AndExpression, OrExpression} from '../expressions/logical-expression';
import {EqualExpression, UnequalExpression} from '../expressions/equality-expression';
import {Variable} from '../expressions/variable';
import {
  GreaterThanEqualExpression, GreaterThanExpression, LessThanEqualExpression,
  LessThanExpression
} from '../expressions/comparison-expression';
import {NegateExpression, NegativeExpression} from '../expressions/unary-expression';
import {DateLiteral} from '../expressions/literals/date-literal';
import {BooleanLiteral} from '../expressions/literals/boolean-literal';
import {NumberLiteral} from '../expressions/literals/number-literal';
import {StringLiteral} from '../expressions/literals/string-literal';

export interface ExpressionVisitor<T> {
  visitBooleanLiteral(literal: BooleanLiteral): T;

  visitNumberLiteral(literal: NumberLiteral): T;

  visitStringLiteral(literal: StringLiteral): T;

  visitDateLiteral(literal: DateLiteral): T;

  visitMultiplyExpression(expr: MultiplyExpression): T;

  visitDivideExpression(expr: DivideExpression): T;

  visitAddExpression(expr: AddExpression): T;

  visitSubtractExpression(expr: SubtractExpression): T;

  visitGreaterThanExpression(expr: GreaterThanExpression): T;

  visitGreaterThanEqualExpression(expr: GreaterThanEqualExpression): T;

  visitLessThanExpression(expr: LessThanExpression): T;

  visitLessThanEqualExpression(expr: LessThanEqualExpression): T;

  visitEqualExpression(expr: EqualExpression): T;

  visitUnequalExpression(expr: UnequalExpression): T;

  visitAndExpression(expr: AndExpression): T;

  visitOrExpression(expr: OrExpression): T;

  visitNegativeExpression(expr: NegativeExpression): T;

  visitNegateExpression(expr: NegateExpression): T;

  visitVariable(expr: Variable): T;
}
