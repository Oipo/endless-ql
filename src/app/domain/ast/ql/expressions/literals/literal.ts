import {Location, locationToReadableMessage} from '../../../location';
import {Expression} from '../expression';
import {BooleanLiteral} from './boolean-literal';
import {NumberLiteral} from './number-literal';
import {StringLiteral} from './string-literal';
import {DateLiteral} from './date-literal';
import {ExpressionType, ExpressionTypeUtil} from '../expression-type';
import {UnsupportedEvaluationError} from '../../../../errors';

export abstract class Literal extends Expression {
  constructor(readonly location: Location) {
    super(location);
  }

  abstract getValue(): any;

  abstract getType(): ExpressionType;

  // arithmetic

  add(literal: Literal): Literal {
    return this.throwError(literal);
  }

  addBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  addNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  addString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  addDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  subtract(literal: Literal): Literal {
    return this.throwError(literal);
  }

  subtractBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  subtractNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  subtractString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  subtractDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  multiply(literal: Literal): Literal {
    return this.throwError(literal);
  }

  multiplyBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  multiplyNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  multiplyString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  multiplyDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  divide(literal: Literal): Literal {
    return this.throwError(literal);
  }

  divideBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  divideNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  divideString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  divideDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  // boolean operators

  greaterThan(literal: Literal): Literal {
    return this.throwError(literal);
  }

  greaterThanBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThan(literal: Literal): Literal {
    return this.throwError(literal);
  }

  lesserThanBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanEquals(literal: Literal): Literal {
    return this.throwError(literal);
  }

  greaterThanEqualsBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanEqualsNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanEqualsString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  greaterThanEqualsDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanEquals(literal: Literal): Literal {
    return this.throwError(literal);
  }

  lesserThanEqualsBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanEqualsNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanEqualsString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  lesserThanEqualsDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  equals(literal: Literal): Literal {
    return this.throwError(literal);
  }

  equalsBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  equalsNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  equalsString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  equalsDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  notEquals(literal: Literal): Literal {
    return this.throwError(literal);
  }

  notEqualsBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  notEqualsNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  notEqualsString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  notEqualsDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  and(literal: Literal): Literal {
    return this.throwError(literal);
  }

  andBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  andNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  andString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  andDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  or(literal: Literal): Literal {
    return this.throwError(literal);
  }

  orBoolean(literal: BooleanLiteral): Literal {
    return this.throwError(literal);
  }

  orNumber(literal: NumberLiteral): Literal {
    return this.throwError(literal);
  }

  orString(literal: StringLiteral): Literal {
    return this.throwError(literal);
  }

  orDate(literal: DateLiteral): Literal {
    return this.throwError(literal);
  }

  negative(): Literal {
    throw new UnsupportedEvaluationError('Cannot do operation');
  }

  negation(): Literal {
    throw new UnsupportedEvaluationError('Cannot do operation');
  }

  private throwError(literal: Literal): Literal {
    throw new UnsupportedEvaluationError(`Cannot do operation on ${ExpressionTypeUtil.toString(literal.getType())} ` +
    locationToReadableMessage(literal.location));
  }
}

