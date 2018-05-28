import {Location} from '../../../location';
import {ExpressionType} from '../expression-type';
import {ExpressionVisitor} from '../../visitors/expression-visitor';
import {Literal} from './literal';

export class BooleanLiteral extends Literal {
  constructor(public readonly value: boolean, readonly location: Location) {
    super(location);
  }

  getValue(): any {
    return this.value;
  }

  getType(): ExpressionType {
    return ExpressionType.BOOLEAN;
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitBooleanLiteral(this);
  }

  // boolean ops

  equals(literal: Literal): Literal {
    return literal.equalsBoolean(this);
  }

  equalsBoolean(literal: BooleanLiteral): Literal {
    return new BooleanLiteral(this.value === literal.value, this.location);
  }

  notEquals(literal: Literal): Literal {
    return literal.notEqualsBoolean(this);
  }

  notEqualsBoolean(literal: BooleanLiteral): Literal {
    return new BooleanLiteral(this.value !== literal.value, this.location);
  }

  or(literal: Literal): Literal {
    return literal.orBoolean(this);
  }

  orBoolean(literal: BooleanLiteral): Literal {
    return new BooleanLiteral(this.value || literal.value, this.location);
  }

  and(literal: Literal): Literal {
    return literal.andBoolean(this);
  }

  andBoolean(literal: BooleanLiteral): Literal {
    return new BooleanLiteral(this.value && literal.value, this.location);
  }

  negation(): Literal {
    return new BooleanLiteral(!this.value, this.location);
  }
}
