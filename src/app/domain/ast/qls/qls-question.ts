import {DefaultStyling} from './default-styling';
import {Location} from '../location';
import {Widget} from './widget';
import {QlsNode, QuestionWithAppliedStyles} from './qls-node';
import {Style} from './style';
import {QuestionType} from '../question-type';
import {WidgetType} from './widget-type';
import {MissingIdentifierError, UnsupportedTypeError} from '../../errors';
import {QlQuestion as QlQuestion} from '../ql/ql-question';
import * as _ from 'lodash';

export class QlsQuestion extends QlsNode {
  constructor(readonly name: string, public widget: Widget, readonly location: Location, readonly defaultSettings?: DefaultStyling) {
    super();
  }

  getQuestions(parentStyles: ReadonlyArray<Style>, widgetParent: Widget): ReadonlyArray<QuestionWithAppliedStyles> {
    const updatedParentStyles: ReadonlyArray<Style> = this.defaultSettings && this.defaultSettings.styles.length > 0 ?
      parentStyles.concat(this.defaultSettings.styles) : parentStyles;

    const widget = this.widget.type !== WidgetType.NONE ? this.widget : widgetParent;

    return [new QuestionWithAppliedStyles(this, updatedParentStyles, widget)];
  }

  checkStylesheet(parentDefaults: ReadonlyArray<DefaultStyling>, allQuestions: QlQuestion[]): void {
    const qlQuestion: QlQuestion = _.find(allQuestions, {name: this.name});

    if (!qlQuestion) {
      throw new MissingIdentifierError(`Question with name ${this.name} not found`);
    }

    if (this.widget.type !== WidgetType.NONE) {
      this.throwIfQlsTypeDoesNotMatchQlType(qlQuestion.type, this.widget.type);
      return;
    }

    if (this.defaultSettings && this.defaultSettings.type === qlQuestion.type) {
      this.throwIfQlsTypeDoesNotMatchQlType(qlQuestion.type, this.defaultSettings.widget.type);
    } else {
      for (let i = parentDefaults.length - 1; i >= 0; i--) {
        if (parentDefaults[i].type === qlQuestion.type) {
          this.throwIfQlsTypeDoesNotMatchQlType(qlQuestion.type, parentDefaults[i].widget.type);
          break;
        }
      }
    }
  }

  // throw an exception when an error is detected, otherwise do nothing
  private throwIfQlsTypeDoesNotMatchQlType(qlType: QuestionType<any>, widgetType: WidgetType): void {
    if (widgetType === WidgetType.NONE) {
      throw new UnsupportedTypeError(`Expected a type for question ${this.name}`);
    }

    if (!qlType.isCompatibleWithWidget(widgetType)) {
      throw new TypeError(`Question ${this.name} has type boolean but QLS defines something else than checkbox or radio.`);
    } else if (!qlType.isCompatibleWithWidget(widgetType)) {
      throw new TypeError(`Question ${this.name} has type integer but QLS defines something else than text, slider or spinbox.`);
    } else if (!qlType.isCompatibleWithWidget(widgetType)) {
      throw new TypeError(`Question ${this.name} has type string but QLS defines something else than text.`);
    } else if (!qlType.isCompatibleWithWidget(widgetType)) {
      throw new TypeError(`Question ${this.name} has type date but QLS defines something else than text.`);
    }
  }
}
