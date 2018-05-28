import {ExpressionType} from './expression-type';
import {Location} from '../../location';
import {QlQuestion} from '../ql-question';
import {Variable} from './variable';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export type LiteralType = boolean | number | string | Date;

export abstract class Expression {
  constructor(public location: Location) {
  }

  abstract checkType(allQuestions: QlQuestion[]): ExpressionType;

  abstract getVariables(): Variable[];

  abstract accept<T>(visitor: ExpressionVisitor<T>): T;

  public getLocationErrorMessage(): string {
    return ` between line ${this.location.start.line}` +
      ` and col ${this.location.start.column} and line ${this.location.end.line} and col ${this.location.end.column}`;
  }
}
