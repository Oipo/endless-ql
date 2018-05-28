import {Location} from '../location';
import {Widget} from './widget';
import {QlsNode} from './qls-node';
import {QlsVisitor} from './visitors/qls-visitor';

export class QlsQuestion extends QlsNode {
  constructor(readonly name: string, public widget: Widget, readonly location: Location) {
    super();
  }

  accept<T>(visitor: QlsVisitor<T>): T {
    return visitor.visitQlsQuestion(this);
  }
}
