import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DefaultStyling, QlsQuestion, Section, Style, Stylesheet, Widget} from '../../domain/ast/qls';
import {QuestionBase} from '../../domain/angular-questions/question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-styled-form-content',
  templateUrl: './styled-form-content.component.html',
  styleUrls: ['./styled-form-content.component.css']
})
export class StyledFormContentComponent implements OnInit, OnChanges {
  @Input() styles: Stylesheet;
  @Input() questions: QuestionBase<any>[];
  @Input() form: FormGroup;
  qlsToQlQuestionDictionary: Map<string, QuestionBase<any>> = new Map<string, QuestionBase<any>>();
  initialized = false;
  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  private init() {
    if (this.styles && this.questions) {
      this.createQuestionMappingCache();
      this.assignStyleToQuestions();
      this.initialized = true;
    }
  }

  // This function is necessary to circumvent angular locking up the GUI
  getSectionQuestions(section: Section, parentSettings: DefaultStyling): ReadonlyArray<QuestionBase<any>> {
    const parentWidget = parentSettings ? parentSettings.widget : Widget.Empty;
    return section.getQuestions([], parentWidget).map(q => {
      return this.getQuestionBaseByName(q.question.name);
    });
  }

  getQuestionBaseByName(name: string): QuestionBase<any> {
    const question = this.qlsToQlQuestionDictionary[name];

    if (!question) {
      throw new Error(`Couldn't get question '${name}'`);
    }

    return question;
  }

  createQuestionMappingCache() {
    for (const qlsQuestion of this.styles.getQuestions([])) {
      let questionBase: QuestionBase<any>;

      for (const q of this.questions) {
        if (q.key === qlsQuestion.question.name) {
          questionBase = q;
          break;
        }
      }

      if (!questionBase) {
        throw new Error(`Couldn't find question ${qlsQuestion.question.name}`);
      }

      this.qlsToQlQuestionDictionary[qlsQuestion.question.name] = questionBase;
    }
  }

  assignStyleToQuestions() {
    for (const qlsQuestionWithAppliedStyles of this.styles.getQuestions([])) {
      const question = this.qlsToQlQuestionDictionary[qlsQuestionWithAppliedStyles.question.name];

      if (qlsQuestionWithAppliedStyles.styles && qlsQuestionWithAppliedStyles.styles.length > 0) {
        const styles: Map<string, Style> = new Map<string, Style>();

        for (const style of qlsQuestionWithAppliedStyles.styles) {
          styles.set(style.name, style);
        }

        const questionStyle = {};

        for (const [, v] of styles) {
          questionStyle[v.name] = v.value.getValueAsString();
        }

        question.style = questionStyle;
      }
    }
  }
}
