import {Statement} from './statement';
import {Location} from '../location';
import {Expression} from './expressions/expression';
import {StatementVisitor} from './visitors/statement-visitor';

export class If extends Statement {
  constructor(
    readonly condition: Expression,
    readonly statements: Statement[],
    readonly elseStatements: Statement[],
    location: Location) {
    super(location);
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitIf(this);
  }
}
