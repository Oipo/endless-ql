import {Location} from '../../location';
import {ExpressionVisitor} from '../visitors/expression-visitor';

export abstract class Expression {
  constructor(public readonly location: Location) {
  }

  abstract accept<T>(visitor: ExpressionVisitor<T>): T;
}
