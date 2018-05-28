import {Location} from '../location';
import {StatementVisitor} from './visitors/statement-visitor';

export abstract class Statement {
  constructor(readonly location: Location) {}

  abstract accept<T>(visitor: StatementVisitor<T>): T;
}
