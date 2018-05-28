import {QuestionType} from '../domain/ast/question-type';
import {QuestionBase} from '../domain/angular-questions/question-base';
import {InputQuestion} from '../domain/angular-questions/input-question';
import {BooleanQuestion} from '../domain/angular-questions/boolean-question';
import {FormGroup} from '@angular/forms';
import {Style, Widget} from '../domain/ast/qls';
import {StyledQuestion} from '../domain/angular-questions/styled-question';
import {DateQuestion} from '../domain/angular-questions/date-question';

export class QuestionFactory {
  static toFormQuestion(name: string,
                        label: string,
                        type: QuestionType<any>,
                        condition: (form: FormGroup) => boolean): QuestionBase<any> {

    let formQuestionToReturn: QuestionBase<any>;

    if (type.toString() === 'boolean') {
      formQuestionToReturn = new BooleanQuestion(name, label, type.getDefaultValue(), type.toHtmlInputType(), condition);
    } else if (type.toString() === 'date') {
      formQuestionToReturn = new DateQuestion(name, label, type.getDefaultValue(), type.toHtmlInputType(), condition);
    } else {
      formQuestionToReturn = new InputQuestion(name, label, type.getDefaultValue(), type.toHtmlInputType(), condition);
    }

    return formQuestionToReturn;
  }

  static applyStylesToFormQuestion<T>(question: QuestionBase<any>, widget: Widget, styles: Style[]): StyledQuestion<T> {

    const styleMap: { [key: string]: string } = {};

    for (const style of styles) {
      styleMap[style.name] = style.value.getValueAsString();
    }

    const styledQuestion = new StyledQuestion<T>(
      question.key,
      question.label,
      question.value,
      question.type,
      question.controlType,
      question.hiddenCondition,
      widget,
      styleMap
    );

    if (question.readonly) {
      styledQuestion.toCalculatedQuestion(question.calculateValue);
    }

    return styledQuestion;
  }
}
