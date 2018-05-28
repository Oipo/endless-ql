import {Location} from '../../../location';
import {Variable} from '../variable';
import {Expression} from '../expression';
import {BooleanLiteral} from './boolean-literal';
import {NumberLiteral} from './number-literal';
import {StringLiteral} from './string-literal';
import {DateLiteral} from './date-literal';

export abstract class Literal extends Expression {
  constructor(location: Location) {
    super(location);
  }

  getVariables(): Variable[] {
    return [];
  }

  abstract getValue(): any;

  // arithmetic

  add(literal: Literal): Literal {
    throw new Error();
  }

  addBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  addNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  addString(literal: StringLiteral): Literal {
    throw new Error();
  }

  addDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  subtract(literal: Literal): Literal {
    throw new Error();
  }

  subtractBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  subtractNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  subtractString(literal: StringLiteral): Literal {
    throw new Error();
  }

  subtractDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  multiply(literal: Literal): Literal {
    throw new Error();
  }

  multiplyBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  multiplyNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  multiplyString(literal: StringLiteral): Literal {
    throw new Error();
  }

  multiplyDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  divide(literal: Literal): Literal {
    throw new Error();
  }

  divideBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  divideNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  divideString(literal: StringLiteral): Literal {
    throw new Error();
  }

  divideDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  // boolean operators

  greaterThan(literal: Literal): Literal {
    throw new Error();
  }

  greaterThanBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  greaterThanNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  greaterThanString(literal: StringLiteral): Literal {
    throw new Error();
  }

  greaterThanDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  lesserThan(literal: Literal): Literal {
    throw new Error();
  }

  lesserThanBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  lesserThanNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  lesserThanString(literal: StringLiteral): Literal {
    throw new Error();
  }

  lesserThanDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  greaterThanEquals(literal: Literal): Literal {
    throw new Error();
  }

  greaterThanEqualsBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  greaterThanEqualsNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  greaterThanEqualsString(literal: StringLiteral): Literal {
    throw new Error();
  }

  greaterThanEqualsDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  lesserThanEquals(literal: Literal): Literal {
    throw new Error();
  }

  lesserThanEqualsBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  lesserThanEqualsNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  lesserThanEqualsString(literal: StringLiteral): Literal {
    throw new Error();
  }

  lesserThanEqualsDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  equals(literal: Literal): Literal {
    throw new Error();
  }

  equalsBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  equalsNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  equalsString(literal: StringLiteral): Literal {
    throw new Error();
  }

  equalsDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  notEquals(literal: Literal): Literal {
    throw new Error();
  }

  notEqualsBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  notEqualsNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  notEqualsString(literal: StringLiteral): Literal {
    throw new Error();
  }

  notEqualsDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  and(literal: Literal): Literal {
    throw new Error();
  }

  andBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  andNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  andString(literal: StringLiteral): Literal {
    throw new Error();
  }

  andDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  or(literal: Literal): Literal {
    throw new Error();
  }

  orBoolean(literal: BooleanLiteral): Literal {
    throw new Error();
  }

  orNumber(literal: NumberLiteral): Literal {
    throw new Error();
  }

  orString(literal: StringLiteral): Literal {
    throw new Error();
  }

  orDate(literal: DateLiteral): Literal {
    throw new Error();
  }

  negative(): Literal {
    throw new Error();
  }

  negation(): Literal {
    throw new Error();
  }
}

