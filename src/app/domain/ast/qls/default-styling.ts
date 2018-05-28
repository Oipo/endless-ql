import {Location} from '../location';
import {Style} from './style';
import {Widget} from './widget';
import {QuestionType} from '../question-type';

export class DefaultStyling {
  constructor(readonly type: QuestionType<any>, readonly widget: Widget, readonly styles: Style[], readonly location: Location) {}

  isQuestionTypeCompatibleWithWidgetType(): boolean {
    if (this.type && this.widget) {
      return this.type.isCompatibleWithWidget(this.widget.type);
    }
    return false;
  }
}
