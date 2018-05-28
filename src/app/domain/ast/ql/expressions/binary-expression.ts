import {Expression} from './expression';
import {Variable} from './variable';
import {Location} from '../../location';
import * as _ from 'lodash';

export abstract class BinaryExpression extends Expression {

  constructor(public left: Expression, public right: Expression, location: Location) {
    super(location);
  }

  getVariables(): Variable[] {
    return _.flatten(this.left.getVariables().concat(this.right.getVariables()));
  }
}
