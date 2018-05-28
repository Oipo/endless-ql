import {Page} from '../page';
import {Section} from '../section';
import {Stylesheet} from '../stylesheet';
import {QlsQuestion} from '../qls-question';
import {Widget} from '../widget';
import {WidgetType} from '../widget-type';
import {Style} from '../style';
import {MissingIdentifierError} from '../../../errors';
import {QlsVisitor} from './qls-visitor';

export class StylesForQlQuestion {

  static getDefaultStyleForInputType(inputType: string): StylesForQlQuestion {
    switch (inputType) {
      case 'number': return new StylesForQlQuestion([], new Widget(WidgetType.SPINBOX));
      case 'boolean': return new StylesForQlQuestion([], new Widget(WidgetType.CHECKBOX));
      case 'text': return new StylesForQlQuestion([], new Widget(WidgetType.TEXT));
      case 'date': return new StylesForQlQuestion([], new Widget(WidgetType.TEXT));
      default: throw new TypeError(`html input type ${inputType} is not supported`);
    }
  }

  constructor(public styles: Style[], public widget: Widget) { }

  isStylingValid(): boolean {
    return this.styles.length > 0 || this.widget.type !== WidgetType.NONE;
  }
}

export class CollectStylesForQuestionVisitor implements QlsVisitor<StylesForQlQuestion> {
  constructor(private questionId: string, private type: string) { }

  static visit(questionId: string, questionType: string, stylesheet: Stylesheet): StylesForQlQuestion {
    const visitor = new CollectStylesForQuestionVisitor(questionId, questionType);
    return stylesheet.accept(visitor);
  }

  visitStylesheet(stylesheet: Stylesheet): StylesForQlQuestion {
    let styles: StylesForQlQuestion;
    styles = this.findStylesForStyleable(stylesheet.pages);

    if (!styles) {
      throw new MissingIdentifierError(`Styles for identifier ${this.questionId} were not found`);
    }

    if (!styles.isStylingValid()) {
      styles = StylesForQlQuestion.getDefaultStyleForInputType(this.type);
    }

    return styles;
  }

  visitPage(page: Page): StylesForQlQuestion {
    let styles: StylesForQlQuestion;

    styles = this.findStylesForStyleable(page.sections);

    styles = this.collectDefaultStylingIfNeeded(styles, page);

    return styles;
  }

  visitSection(section: Section): StylesForQlQuestion {
    let styles: StylesForQlQuestion;
    const question = section.questions.find(q => q.name === this.questionId);

    if (question) {
      styles = question.accept(this);
    } else {
      styles = this.findStylesForStyleable(section.subSections);
    }

    styles = this.collectDefaultStylingIfNeeded(styles, section);

    return styles;
  }

  visitQlsQuestion(qlsQuestion: QlsQuestion): StylesForQlQuestion {
    if (qlsQuestion.name === this.questionId) {
      return new StylesForQlQuestion([], qlsQuestion.widget);
    }
    return undefined;
  }

  private collectDefaultStylingIfNeeded(styles: StylesForQlQuestion, defaultStyleable: Section | Page): StylesForQlQuestion {
    if (styles && !styles.isStylingValid()) {
      return this.collectDefaultStylesForQuestion(defaultStyleable) || styles;
    }
    return styles;
  }

  private findStylesForStyleable(styleableArray: Section[] | Page[]): StylesForQlQuestion {
    for (const styleable of styleableArray) {
      const styles = styleable.accept(this);
      if (styles) {
        return styles;
      }
    }
    return undefined;
  }

  private collectDefaultStylesForQuestion(defaultStyleable: Section | Page): StylesForQlQuestion {
    if ( defaultStyleable.defaultStyling && this.type === defaultStyleable.defaultStyling.type.toHtmlInputType()) {
      return new StylesForQlQuestion(defaultStyleable.defaultStyling.styles, defaultStyleable.defaultStyling.widget);
    }
    return undefined;
  }
}
