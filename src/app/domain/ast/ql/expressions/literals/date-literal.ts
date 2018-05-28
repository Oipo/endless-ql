import {Location} from '../../../location';
import {ExpressionType} from '../expression-type';
import {ExpressionVisitor} from '../../visitors/expression-visitor';
import {Literal} from './literal';
import {BooleanLiteral} from './boolean-literal';
import {NumberLiteral} from './number-literal';

export class DateLiteral extends Literal {
  private static HOURS_IN_A_DAY = 24;
  private static SECOND_MINUTE_MULTIPLIER = 60;
  private static MILLISECONDS_TO_SECONDS = 1000;

  constructor(public readonly value: Date, readonly location: Location) {
    super(location);
  }

  getValue(): any {
    return this.value;
  }

  getType(): ExpressionType {
    return ExpressionType.DATE;
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitDateLiteral(this);
  }

  // arithmetic

  add(literal: Literal): Literal {
    return literal.addDate(this);
  }

  addNumber(literal: NumberLiteral): Literal {
    // add days equal to value
    return new DateLiteral(new Date(this.value.getTime() +
      this.milisecondsToDays(literal.value)), this.location);
  }

  subtract(literal: Literal): Literal {
    return literal.subtractDate(this);
  }

  subtractDate(literal: DateLiteral): Literal {
    return new DateLiteral(new Date(this.value.getTime() - literal.value.getTime()), this.location);
  }

  subtractNumber(literal: NumberLiteral): Literal {
    // add days equal to value
    return new DateLiteral(new Date(this.value.getTime() - this.milisecondsToDays(literal.value)), this.location);
  }

  // boolean ops

  equals(literal: Literal): Literal {
    return literal.equalsDate(this);
  }

  equalsDate(literal: DateLiteral): Literal {
    return new BooleanLiteral(this.value === literal.value, this.location);
  }

  notEquals(literal: Literal): Literal {
    return literal.notEqualsDate(this);
  }

  notEqualsDate(literal: DateLiteral): Literal {
    return new BooleanLiteral(this.value !== literal.value, this.location);
  }

  greaterThan(literal: Literal): Literal {
    return literal.greaterThanDate(this);
  }

  greaterThanDate(literal: DateLiteral): Literal {
    return new BooleanLiteral(this.value > literal.value, this.location);
  }

  greaterThanEquals(literal: Literal): Literal {
    return literal.greaterThanEqualsDate(this);
  }

  greaterThanEqualsDate(literal: DateLiteral): Literal {
    return new BooleanLiteral(this.value >= literal.value, this.location);
  }

  lesserThan(literal: Literal): Literal {
    return literal.lesserThanDate(this);
  }

  lesserThanDate(literal: DateLiteral): Literal {
    return new BooleanLiteral(this.value < literal.value, this.location);
  }

  lesserThanEquals(literal: Literal): Literal {
    return literal.lesserThanEqualsDate(this);
  }

  lesserThanEqualsDate(literal: DateLiteral): Literal {
    return new BooleanLiteral(this.value <= literal.value, this.location);
  }

  private milisecondsToDays(miliseconds: number): number {
    return (DateLiteral.MILLISECONDS_TO_SECONDS * DateLiteral.SECOND_MINUTE_MULTIPLIER *
      DateLiteral.SECOND_MINUTE_MULTIPLIER * DateLiteral.HOURS_IN_A_DAY) * miliseconds;
  }
}
