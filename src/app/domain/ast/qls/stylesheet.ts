import {Page} from './page';
import {Location} from '../location';
import {QlsNode} from './qls-node';
import {QlsVisitor} from './visitors/qls-visitor';

export class Stylesheet extends QlsNode {
  constructor(readonly name: string, readonly pages: Page[], readonly location: Location) {
    super();
  }

  accept<T>(visitor: QlsVisitor<T>): T {
    return visitor.visitStylesheet(this);
  }
}
