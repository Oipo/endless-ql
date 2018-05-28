import {QlsVisitor} from './visitors/qls-visitor';

export abstract class QlsNode {
  abstract accept<T>(visitor: QlsVisitor<T>): T;
}
