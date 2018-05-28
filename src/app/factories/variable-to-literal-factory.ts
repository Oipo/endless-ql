import {ExpressionType, Literal, Variable} from '../domain/ast/ql';
import {BooleanLiteral} from '../domain/ast/ql';
import {DateLiteral} from '../domain/ast/ql';
import {NumberLiteral} from '../domain/ast/ql';
import {StringLiteral} from '../domain/ast/ql';

export class VariableToLiteralFactory {
  static toLiteral(variable: Variable, value: any): Literal {
    switch (variable.getExpressionType()) {
      case ExpressionType.NUMBER:
        return new NumberLiteral(value, variable.location);
      case ExpressionType.STRING:
        return new StringLiteral(value, variable.location);
      case ExpressionType.DATE:
        return new DateLiteral(new Date(value), variable.location);
      case ExpressionType.BOOLEAN:
        return new BooleanLiteral(value, variable.location);
      default:
        throw new Error(`Missing implementation for expression type ${variable.getExpressionType()}`);
    }
  }
}
