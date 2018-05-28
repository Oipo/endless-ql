import {Statement} from './statement';
import {Location} from '../location';
import {StatementVisitor} from './visitors/statement-visitor';

export class Form extends Statement {
  constructor(readonly name: string, readonly statements: Statement[], readonly location: Location) {
    super(location);
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitForm(this);
  }
}
