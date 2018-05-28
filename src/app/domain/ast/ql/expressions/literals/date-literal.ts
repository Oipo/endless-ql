import {Location} from '../../../location';
import {QlQuestion} from '../../ql-question';
import {ExpressionType} from '../expression-type';
import {ExpressionVisitor} from '../../visitors/expression-visitor';
import {Literal} from './literal';
import {BooleanLiteral} from './boolean-literal';

export class DateLiteral extends Literal {
  constructor(public value: Date, location: Location) {
    super(location);
  }

  getValue(): any {
    return this.value;
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    return ExpressionType.DATE;
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitDateLiteral(this);
  }

  // arithmetic

  add(literal: Literal): Literal {
    return literal.addDate(this);
  }

  addDate(literal: DateLiteral): Literal {
    return new DateLiteral(new Date(this.value.getDate() + literal.value.getDate()), this.location);
  }

  subtract(literal: Literal): Literal {
    return literal.subtractDate(this);
  }

  subtractDate(literal: DateLiteral): Literal {
    return new DateLiteral(new Date(this.value.getDate() - literal.value.getDate()), this.location);
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
}
