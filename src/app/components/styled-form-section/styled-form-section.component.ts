import {Component, Input} from '@angular/core';
import {Section} from '../../domain/ast/qls';
import {QuestionBase} from '../../domain/angular-questions/question-base';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-styled-form-section',
  templateUrl: './styled-form-section.component.html',
  styleUrls: ['./styled-form-section.component.css']
})
export class StyledFormSectionComponent {
  @Input() section: Section;
  @Input() styledQuestionsMap: Map<string, QuestionBase<any>>;
  @Input() form: FormGroup;

  // This function is necessary to circumvent angular locking up the GUI
  getSectionQuestions(): ReadonlyArray<QuestionBase<any>> {
    return this.section.questions.map(q => {
      return this.getQuestionBaseByName(q.name);
    });
  }

  getQuestionBaseByName(name: string): QuestionBase<any> {
    const question = this.styledQuestionsMap[name];

    if (!question) {
      throw new Error(`Couldn't get question '${name}'`);
    }

    return question;
  }
}
