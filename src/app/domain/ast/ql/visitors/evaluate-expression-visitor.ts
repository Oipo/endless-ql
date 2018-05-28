import {AddExpression, DivideExpression, MultiplyExpression, SubtractExpression} from '../expressions/arithmetic-expression';
import {AndExpression, OrExpression} from '../expressions/logical-expression';
import {EqualExpression, UnequalExpression} from '../expressions/equality-expression';
import {Variable} from '../expressions/variable';
import {
  GreaterThanEqualExpression, GreaterThanExpression, LessThanEqualExpression,
  LessThanExpression
} from '../expressions/comparison-expression';
import {NegateExpression, NegativeExpression} from '../expressions/unary-expression';
import {Literal} from '../expressions/literals/literal';
import {ExpressionVisitor} from './expression-visitor';
import {BooleanLiteral} from '../expressions/literals/boolean-literal';
import {NumberLiteral} from '../expressions/literals/number-literal';
import {StringLiteral} from '../expressions/literals/string-literal';
import {DateLiteral} from '../expressions/literals/date-literal';
import {FormGroup} from '@angular/forms';
import {Expression} from '../';
import {UnknownQuestionError} from '../../../errors';
import {locationToReadableMessage} from '../../location';
import {VariableToLiteralFactory} from '../../../../factories/variable-to-literal-factory';

export class EvaluateExpressionVisitor implements ExpressionVisitor<Literal> {
  constructor(private readonly form: FormGroup) { }

  static visit(form: FormGroup, expression: Expression): Literal {
    const visitor = new EvaluateExpressionVisitor(form);
    return expression.accept(visitor);
  }

  visitBooleanLiteral(literal: BooleanLiteral): Literal {
    return literal;
  }

  visitNumberLiteral(literal: NumberLiteral): Literal {
    return literal;
  }

  visitStringLiteral(literal: StringLiteral): Literal {
    return literal;
  }

  visitDateLiteral(literal: DateLiteral): Literal {
    return literal;
  }

  visitMultiplyExpression(expression: MultiplyExpression): Literal {
    return expression.right.accept(this).multiply(expression.left.accept(this));
  }

  visitDivideExpression(expression: DivideExpression): Literal {
    return expression.right.accept(this).divide(expression.left.accept(this));
  }

  visitAddExpression(expression: AddExpression): Literal {
    return expression.right.accept(this).add(expression.left.accept(this));
  }

  visitSubtractExpression(expression: SubtractExpression): Literal {
    return expression.right.accept(this).subtract(expression.left.accept(this));
  }

  visitGreaterThanExpression(expression: GreaterThanExpression): Literal {
    return expression.right.accept(this).greaterThan(expression.left.accept(this));
  }

  visitGreaterThanEqualExpression(expression: GreaterThanEqualExpression): Literal {
    return expression.right.accept(this).greaterThanEquals(expression.left.accept(this));
  }

  visitLessThanExpression(expression: LessThanExpression): Literal {
    return expression.right.accept(this).lesserThan(expression.left.accept(this));
  }

  visitLessThanEqualExpression(expression: LessThanEqualExpression): Literal {
    return expression.right.accept(this).lesserThanEquals(expression.left.accept(this));
  }

  visitEqualExpression(expression: EqualExpression): Literal {
    return expression.right.accept(this).equals(expression.left.accept(this));
  }

  visitUnequalExpression(expression: UnequalExpression): Literal {
    return expression.right.accept(this).notEquals(expression.left.accept(this));
  }

  visitAndExpression(expression: AndExpression): Literal {
    return expression.right.accept(this).and(expression.left.accept(this));
  }

  visitOrExpression(expression: OrExpression): Literal {
    return expression.right.accept(this).or(expression.left.accept(this));
  }

  visitNegativeExpression(expression: NegativeExpression): Literal {
    return expression.right.accept(this).negative();
  }

  visitNegateExpression(expression: NegateExpression): Literal {
    return expression.right.accept(this).negation();
  }

  visitVariable(expression: Variable): Literal {
    const referencedControl = this.form.controls[expression.identifier];

    if (referencedControl) {
      /* Angular sets the value for a form control with undefined as value to an object {value: ""}
         If there is a value, instead of the object there will be a value, which means value.value is undefined */

      if ( referencedControl.value !== null && referencedControl.value.value === undefined) {
        return VariableToLiteralFactory.toLiteral(expression, referencedControl.value);
      }

      // Unknown literal
      return new NumberLiteral(undefined, expression.location);
    } else if (referencedControl.value === null) {
      return new NumberLiteral(undefined, expression.location);
    } else {
      throw new UnknownQuestionError(`Question for identifier ${expression.identifier} could not be found`
        + locationToReadableMessage(expression.location));
    }
  }
}
