import {QuestionType} from '../domain/ast/question-type';
import {QuestionBase} from '../domain/angular-questions/question-base';
import {InputQuestion} from '../domain/angular-questions/input-question';
import {BooleanQuestion} from '../domain/angular-questions/boolean-question';
import {FormGroup} from '@angular/forms';

export class QuestionFactory {
  static toFormQuestion(name: string,
                        label: string,
                        type: QuestionType<any>,
                        condition?: (form: FormGroup) => boolean
                        ): QuestionBase<any> {

    let formQuestionsToReturn: QuestionBase<any>;

    if (type.toString() === 'boolean') {
      formQuestionsToReturn = new BooleanQuestion(name, label, type.getDefaultValue(), type.toHtmlInputType(), condition);
    } else {
      formQuestionsToReturn = new InputQuestion(name, label, type.getDefaultValue(), type.toHtmlInputType(), condition);
    }

    return formQuestionsToReturn;
  }
}
