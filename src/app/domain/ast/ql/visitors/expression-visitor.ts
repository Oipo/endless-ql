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

  visitMultiplyExpression(expression: MultiplyExpression): T;

  visitDivideExpression(expression: DivideExpression): T;

  visitAddExpression(expression: AddExpression): T;

  visitSubtractExpression(expression: SubtractExpression): T;

  visitGreaterThanExpression(expression: GreaterThanExpression): T;

  visitGreaterThanEqualExpression(expression: GreaterThanEqualExpression): T;

  visitLessThanExpression(expression: LessThanExpression): T;

  visitLessThanEqualExpression(expression: LessThanEqualExpression): T;

  visitEqualExpression(expression: EqualExpression): T;

  visitUnequalExpression(expression: UnequalExpression): T;

  visitAndExpression(expression: AndExpression): T;

  visitOrExpression(expression: OrExpression): T;

  visitNegativeExpression(expression: NegativeExpression): T;

  visitNegateExpression(expression: NegateExpression): T;

  visitVariable(expression: Variable): T;
}
