import {inject, TestBed} from '@angular/core/testing';
import {QuestionControlService} from './question-control.service';
import {InputQuestion} from '../domain/angular-questions/input-question';
import {BooleanQuestion} from '../domain/angular-questions/boolean-question';

describe('The question control service', () => {
  let service: QuestionControlService;

  const questions = [
    new InputQuestion(
      'intQuestion',
      'intQuestion?',
      undefined,
      'number',
      undefined
    ),
    new InputQuestion(
      'decimalQuestion',
      'decimalQuestion?',
      undefined,
      'number',
      undefined
    ),
    new BooleanQuestion(
      'booleanQuestion',
      'booleanQuestion?',
      undefined,
      'boolean',
      undefined
    ),
    new InputQuestion(
      'stringQuestion',
      'stringQuestion?',
      '',
      'text',
      undefined
    ),
    new InputQuestion(
      'dateQuestion',
      'dateQuestion?',
      undefined,
      'date',
      undefined
    )
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionControlService]
    });
  });

  beforeEach(inject([QuestionControlService], (_service: QuestionControlService) => {
    service = _service;
  }));

  it('should return formControl elements for questions', () => {
    const result = service.toFormGroup(questions);
    expect(result.get('intQuestion')).toBeDefined();
    expect(result.get('decimalQuestion')).toBeDefined();
    expect(result.get('booleanQuestion')).toBeDefined();
    expect(result.get('stringQuestion')).toBeDefined();
    expect(result.get('stringQuestion').value).toBe('');
    expect(result.get('dateQuestion')).toBeDefined();
  });
});


