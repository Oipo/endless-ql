import {Component, isDevMode} from '@angular/core';
import {QuestionBase} from './domain/angular-questions/question-base';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from './services/question-control.service';
import {Stylesheet} from './domain/ast/qls';
import {Form} from './domain/ast/ql/index';
import * as qlsMock from './qls-mock-input';
import * as qlMock from './ql-mock-input';
import {ParseService} from './services/parse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputQl: string;
  inputQls: string;
  questions: QuestionBase<any>[] = [];
  form: FormGroup;
  formName: string;
  errorMessage: string;
  payload: string;
  qlForm: Form;
  qlsStylesheet: Stylesheet;

  constructor(private questionControlService: QuestionControlService, private parseService: ParseService) { }

  prefillForm() {
    this.inputQls = qlsMock.validQLS;

    this.inputQl = qlMock.validQl;
  }

  parseInput() {
    try {
      const parseResult = this.parseService.parse(this.inputQl, this.inputQls);
      this.formName = parseResult.formName;
      this.qlForm = parseResult.form;
      this.qlsStylesheet = parseResult.styles;
      // make form
      this.questions = this.qlForm.toFormQuestion();
      // loop over questions, update widget types

      if (this.qlsStylesheet) {
        for (const qlsQuestion of this.qlsStylesheet.getQuestions([])) {
          const qlQuestion = this.questions.find(q => q.key === qlsQuestion.question.name);
          qlQuestion.widget.type = qlsQuestion.widget.type;
        }
      }

      this.form = this.questionControlService.toFormGroup(this.questions);
      this.errorMessage = undefined;
    } catch (e) {
      this.form = undefined;
      this.formName = undefined;
      this.questions = undefined;
      this.qlsStylesheet = undefined;
      this.qlForm = undefined;
      this.errorMessage = e.message;

      if (isDevMode()) {
        console.log(e);
      }
    }
    this.payload = undefined;
  }

  onSubmit() {
    this.payload = this.form.getRawValue();
    console.log(this.form.getRawValue());
  }
}
