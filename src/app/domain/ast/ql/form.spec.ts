import {Form, QlQuestion, QuestionType} from './index';
import {BooleanQuestion} from '../../angular-questions/boolean-question';
import {InputQuestion} from '../../angular-questions/input-question';
import {Statement} from './index';
import {If} from './if';
import {FormControl, FormGroup} from '@angular/forms';
import {Variable} from './expressions/variable';
import * as astMock from './ast-mock';
import {BooleanQuestionType, DateQuestionType, IntQuestionType, StringQuestionType} from '../question-type';

describe('Form', () => {

  const questions: Statement[] = [
    new QlQuestion('intQuestion', 'intQuestion?', new IntQuestionType(), astMock.emptyLoc),
    new QlQuestion('booleanQuestion', 'booleanQuestion?', new BooleanQuestionType(), astMock.emptyLoc),
    new QlQuestion('booleanQuestion2', 'booleanQuestion2?', new BooleanQuestionType(), astMock.emptyLoc),
    new QlQuestion('stringQuestion', 'stringQuestion?', new StringQuestionType(), astMock.emptyLoc),
    new QlQuestion('dateQuestion', 'dateQuestion?', new DateQuestionType(), astMock.emptyLoc)
  ];

  const ifs = [
    new If(new Variable('booleanQuestion', astMock.emptyLoc),
      [
        new If
        (new Variable('booleanQuestion2', astMock.emptyLoc),
          [new QlQuestion('intQuestion2', 'intQuestion2?', new IntQuestionType(), astMock.emptyLoc)],
          [],
          astMock.emptyLoc)
      ],
      [],
      astMock.emptyLoc)
  ];

  it('should return the proper QuestionBase questions', () => {
    const formQuestions = new Form('test', questions, astMock.emptyLoc).toFormQuestion();
    expect(formQuestions.length).toBe(5);
    expect(formQuestions[0].key).toBe('intQuestion');
    expect(formQuestions[0].label).toBe('intQuestion?');
    expect(formQuestions[0].controlType).toBe('textbox');
    expect((<InputQuestion> formQuestions[0]).type).toBe('number');
    expect((<InputQuestion> formQuestions[1]).type).toBe('boolean');
    expect((<BooleanQuestion> formQuestions[2]).type).toBe('boolean');
    expect(formQuestions[2].controlType).toBe('checkbox');
    expect((<InputQuestion> formQuestions[3]).type).toBe('text');
    expect((<InputQuestion> formQuestions[4]).type).toBe('date');
  });

  it('should check condition of both ifs when nested', () => {
    const formQuestions = new Form('test', questions.concat(ifs), astMock.emptyLoc).toFormQuestion();

    expect(formQuestions.length).toBe(6);

    const group: any = {};
    group['booleanQuestion'] = new FormControl();
    group['booleanQuestion2'] = new FormControl();
    const formGroup = new FormGroup(group);

    formGroup.controls['booleanQuestion'].setValue(true);
    formGroup.controls['booleanQuestion2'].setValue(true);
    expect(formQuestions[5].hiddenCondition(formGroup)).toBe(true);

    formGroup.controls['booleanQuestion'].setValue(false);
    formGroup.controls['booleanQuestion2'].setValue(true);
    expect(formQuestions[5].hiddenCondition(formGroup)).toBe(false);

    formGroup.controls['booleanQuestion'].setValue(true);
    formGroup.controls['booleanQuestion2'].setValue(false);
    expect(formQuestions[5].hiddenCondition(formGroup)).toBe(false);

    formGroup.controls['booleanQuestion'].setValue(false);
    formGroup.controls['booleanQuestion2'].setValue(false);
    expect(formQuestions[5].hiddenCondition(formGroup)).toBe(false);
  });
});
