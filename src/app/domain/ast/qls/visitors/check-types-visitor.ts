import {QlsVisitor} from './qls-visitor';
import {Stylesheet} from '../stylesheet';
import {Page} from '../page';
import {Section} from '../section';
import {QlsQuestion} from '../qls-question';
import {QlQuestion} from '../../ql';
import {WidgetType} from '../widget-type';
import {MissingIdentifierError, UnsupportedTypeError} from '../../../errors';
import {QuestionType} from '../../question-type';
import * as _ from 'lodash';
import {DefaultStyling} from '../default-styling';

export class CheckTypesVisitor implements QlsVisitor<void> {

  static visit(qlQuestions: ReadonlyArray<QlQuestion>, stylesheet: Stylesheet): void {
    const visitor = new CheckTypesVisitor(qlQuestions);
    visitor.visitStylesheet(stylesheet);
  }

  constructor(readonly qlQuestions: ReadonlyArray<QlQuestion>) {
  }

  visitStylesheet(stylesheet: Stylesheet): void {
    for (const page of stylesheet.pages) {
      page.accept(this);
    }
  }

  visitPage(page: Page): void {
    for (const section of page.sections) {
      section.accept(this);
    }

    if (page.defaultStyling) {
      this.throwIfDefaultStylingIsIncorrect(page.name, page.defaultStyling);
    }
  }

  visitSection(section: Section): void {
    for (const qlsQuestion of section.questions) {
      qlsQuestion.accept(this);
    }

    for (const subsection of section.subSections) {
      subsection.accept(this);
    }

    if (section.defaultStyling) {
      this.throwIfDefaultStylingIsIncorrect(section.name, section.defaultStyling);
    }
  }

  visitQlsQuestion(qlsQuestion: QlsQuestion): void {
    const qlQuestion: QlQuestion = _.find(this.qlQuestions, {name: qlsQuestion.name});

    if (!qlQuestion) {
      throw new MissingIdentifierError(`Question with name ${qlsQuestion.name} not found`);
    }

    if (qlsQuestion.widget.type !== WidgetType.NONE) {
      this.throwIfQlsTypeDoesNotMatchQlType(qlsQuestion.name, qlQuestion.type, qlsQuestion.widget.type);
    }
  }

  private throwIfDefaultStylingIsIncorrect(name: string, styling: DefaultStyling): void {
    if (!styling.isQuestionTypeCompatibleWithWidgetType()) {
      throw new TypeError(`Default styling of section ${name} has an incompatible widget type ${styling.widget.type}` +
      `for defined question type ${styling.type.toString()}. It should be one of: ${styling.type.getCompatibleWidgetTypes()}`);
    }
  }

  // throw an exception when an error is detected, otherwise do nothing
  private throwIfQlsTypeDoesNotMatchQlType(name: string, qlType: QuestionType<any>, widgetType: WidgetType): void {
    if (widgetType === WidgetType.NONE) {
      throw new UnsupportedTypeError(`Expected a type for question ${name}`);
    }

    if (!qlType.isCompatibleWithWidget(widgetType)) {
      throw new TypeError(`Question ${name} has type ${qlType.toString()} ` +
        `but has a widget type that does not match one of: ${qlType.getCompatibleWidgetTypes()}`);
    }
  }
}
