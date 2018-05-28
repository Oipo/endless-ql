import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Stylesheet} from '../../domain/ast/qls';
import {QuestionBase} from '../../domain/angular-questions/question-base';
import {FormGroup} from '@angular/forms';
import {QuestionFactory} from '../../factories/question-factory';
import {CollectStylesForQuestionVisitor} from '../../domain/ast/qls/visitors/collect-styles-for-question-visitor';

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
      this.initialized = true;
    }
  }

  createQuestionMappingCache() {
      for (const question of this.questions) {
        const styles = CollectStylesForQuestionVisitor.visit( question.key, question.type, this.styles);
        const questionWithStyling = QuestionFactory.applyStylesToFormQuestion(question, styles.widget, styles.styles);
        this.qlsToQlQuestionDictionary[questionWithStyling.key] = questionWithStyling;
      }
  }
}
