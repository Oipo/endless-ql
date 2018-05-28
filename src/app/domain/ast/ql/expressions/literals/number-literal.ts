import {Location} from '../../../location';
import {QlQuestion} from '../../ql-question';
import {ExpressionType} from '../expression-type';
import {ExpressionVisitor} from '../../visitors/expression-visitor';
import {BooleanLiteral} from './boolean-literal';
import {Literal} from './literal';

export class NumberLiteral extends Literal {
  constructor(public value: number, location: Location) {
    super(location);
  }

  getValue(): any {
    return this.value;
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    return ExpressionType.NUMBER;
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitNumberLiteral(this);
  }

  // arithmetic

  add(literal: Literal): Literal {
    return literal.addNumber(this);
  }

  addNumber(literal: NumberLiteral): Literal {
    return new NumberLiteral(this.value + literal.value, this.location);
  }

  subtract(literal: Literal): Literal {
    return literal.subtractNumber(this);
  }

  subtractNumber(literal: NumberLiteral): Literal {
    return new NumberLiteral(this.value - literal.value, this.location);
  }

  multiply(literal: Literal): Literal {
    return literal.multiplyNumber(this);
  }

  multiplyNumber(literal: NumberLiteral): Literal {
    return new NumberLiteral(this.value * literal.value, this.location);
  }

  divide(literal: Literal): Literal {
    return literal.divideNumber(this);
  }

  divideNumber(literal: NumberLiteral): Literal {
    return new NumberLiteral(this.value / literal.value, this.location);
  }

  // boolean ops

  equals(literal: Literal): Literal {
    return literal.equalsNumber(this);
  }

  equalsNumber(literal: NumberLiteral): Literal {
    return new BooleanLiteral(this.value === literal.value, this.location);
  }

  notEquals(literal: Literal): Literal {
    return literal.notEqualsNumber(this);
  }

  notEqualsNumber(literal: NumberLiteral): Literal {
    return new BooleanLiteral(this.value !== literal.value, this.location);
  }

  greaterThan(literal: Literal): Literal {
    return literal.greaterThanNumber(this);
  }

  greaterThanNumber(literal: NumberLiteral): Literal {
    return new BooleanLiteral(this.value > literal.value, this.location);
  }

  greaterThanEquals(literal: Literal): Literal {
    return literal.greaterThanEqualsNumber(this);
  }

  greaterThanEqualsNumber(literal: NumberLiteral): Literal {
    return new BooleanLiteral(this.value >= literal.value, this.location);
  }

  lesserThan(literal: Literal): Literal {
    return literal.lesserThanNumber(this);
  }

  lesserThanNumber(literal: NumberLiteral): Literal {
    return new BooleanLiteral(this.value < literal.value, this.location);
  }

  lesserThanEquals(literal: Literal): Literal {
    return literal.lesserThanEqualsNumber(this);
  }

  lesserThanEqualsNumber(literal: NumberLiteral): Literal {
    return new BooleanLiteral(this.value <= literal.value, this.location);
  }

  negative(): Literal {
    return new NumberLiteral(-this.value, this.location);
  }
}
