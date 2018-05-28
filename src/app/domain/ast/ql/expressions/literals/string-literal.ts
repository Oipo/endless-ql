import {Location} from '../../../location';
import {QlQuestion} from '../../ql-question';
import {ExpressionType} from '../expression-type';
import {ExpressionVisitor} from '../../visitors/expression-visitor';
import {Literal} from './literal';
import {BooleanLiteral} from './boolean-literal';

export class StringLiteral extends Literal {
  constructor(public value: string, location: Location) {
    super(location);
  }

  getValue(): any {
    return this.value;
  }

  checkType(allQuestions: QlQuestion[]): ExpressionType {
    return ExpressionType.STRING;
  }

  accept<T>(visitor: ExpressionVisitor<T>): T {
    return visitor.visitStringLiteral(this);
  }

  // arithmetic

  add(literal: Literal): Literal {
    return literal.addString(this);
  }

  addString(literal: StringLiteral): Literal {
    return new StringLiteral(this.value + literal.value, this.location);
  }

  // boolean ops

  equals(literal: Literal): Literal {
    return literal.equalsString(this);
  }

  equalsString(literal: StringLiteral): Literal {
    return new BooleanLiteral(this.value === literal.value, this.location);
  }

  notEquals(literal: Literal): Literal {
    return literal.notEqualsString(this);
  }

  notEqualsString(literal: StringLiteral): Literal {
    return new BooleanLiteral(this.value !== literal.value, this.location);
  }
}
