import {Section} from './section';
import {DefaultStyling} from './default-styling';
import {Location} from '../location';
import {QlsNode} from './qls-node';
import {QlsVisitor} from './visitors/qls-visitor';

export class Page extends QlsNode {
  constructor(readonly name: string, readonly sections: Section[], readonly location: Location, readonly defaultStyling?: DefaultStyling) {
    super();
  }

  accept<T>(visitor: QlsVisitor<T>): T {
    return visitor.visitPage(this);
  }
}
