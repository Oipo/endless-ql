import {QlsQuestion} from './qls-question';
import {DefaultStyling} from './default-styling';
import {Location} from '../location';
import {QlsNode} from './qls-node';
import {QlsVisitor} from './visitors/qls-visitor';

export class Section extends QlsNode {
  constructor(readonly name: string, readonly subSections: Section[], readonly questions: QlsQuestion[],
              readonly location: Location, readonly defaultStyling?: DefaultStyling) {
    super();
  }

  accept<T>(visitor: QlsVisitor<T>): T {
    return visitor.visitSection(this);
  }
}
