import {Location} from '../location';
import {Style} from './style';
import {Widget} from './widget';
import {QuestionType} from '../question-type';

export class DefaultStyling {
  constructor(readonly type: QuestionType<any>, readonly widget: Widget, readonly styles: Style[], readonly location: Location) {}
}
