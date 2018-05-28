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

export class EvaluateExpressionVisitor implements ExpressionVisitor<Literal> {
  constructor(private readonly form: FormGroup) { }

  static evaluate(form: FormGroup, expr: Expression): Literal {
    const visitor = new EvaluateExpressionVisitor(form);
    return expr.accept(visitor);
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

  visitMultiplyExpression(expr: MultiplyExpression): Literal {
    return expr.right.accept(this).multiply(expr.left.accept(this));
  }

  visitDivideExpression(expr: DivideExpression): Literal {
    return expr.right.accept(this).divide(expr.left.accept(this));
  }

  visitAddExpression(expr: AddExpression): Literal {
    return expr.right.accept(this).add(expr.left.accept(this));
  }

  visitSubtractExpression(expr: SubtractExpression): Literal {
    return expr.right.accept(this).subtract(expr.left.accept(this));
  }

  visitGreaterThanExpression(expr: GreaterThanExpression): Literal {
    return expr.right.accept(this).greaterThan(expr.left.accept(this));
  }

  visitGreaterThanEqualExpression(expr: GreaterThanEqualExpression): Literal {
    return expr.right.accept(this).greaterThanEquals(expr.left.accept(this));
  }

  visitLessThanExpression(expr: LessThanExpression): Literal {
    return expr.right.accept(this).lesserThan(expr.left.accept(this));
  }

  visitLessThanEqualExpression(expr: LessThanEqualExpression): Literal {
    return expr.right.accept(this).lesserThanEquals(expr.left.accept(this));
  }

  visitEqualExpression(expr: EqualExpression): Literal {
    return expr.right.accept(this).equals(expr.left.accept(this));
  }

  visitUnequalExpression(expr: UnequalExpression): Literal {
    return expr.right.accept(this).notEquals(expr.left.accept(this));
  }

  visitAndExpression(expr: AndExpression): Literal {
    return expr.right.accept(this).and(expr.left.accept(this));
  }

  visitOrExpression(expr: OrExpression): Literal {
    return expr.right.accept(this).or(expr.left.accept(this));
  }

  visitNegativeExpression(expr: NegativeExpression): Literal {
    return expr.right.accept(this).negative();
  }

  visitNegateExpression(expr: NegateExpression): Literal {
    return expr.right.accept(this).negation();
  }

  visitVariable(expr: Variable): Literal {
    const referencedControl = this.form.controls[expr.identifier];
    if (referencedControl) {
      /* Angular sets the value for a form control with undefined as value to an object {value: ""}
         If there is a value, instead of the object there will be a value, which means value.value is undefined */
      if (referencedControl.value.value === undefined) {
        return new NumberLiteral(referencedControl.value, expr.location);
      }

      return new NumberLiteral(undefined, expr.location);
    } else {
      throw new UnknownQuestionError(`Question for identifier ${expr.identifier} could not be found`
        + expr.getLocationErrorMessage());
    }
  }
}
