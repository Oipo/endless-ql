import {Expression} from './expression';
import {Location} from '../../location';

export abstract class BinaryExpression extends Expression {

  constructor(public readonly left: Expression, public readonly right: Expression, readonly location: Location) {
    super(location);
  }
}
