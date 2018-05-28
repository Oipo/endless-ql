import {Variable} from './expressions/variable';
import * as astMock from './ast-mock';
import {ExpressionQuestion} from './expression-question';
import {IntQuestionType} from '../question-type';
import {CircularDependencyError} from '../../errors';
import {CheckStatementTypeVisitor} from './visitors/check-statement-type-visitor';

describe('Expression question', () => {
  const variable = new Variable('question', astMock.emptyLoc);
  const question = new ExpressionQuestion('question', 'label', new IntQuestionType(), variable, astMock.emptyLoc);

  it('should check for circular dependency', () => {
    variable.referencedQuestion = question;
    expect(() => CheckStatementTypeVisitor.visit([question], question)).toThrow(jasmine.any(CircularDependencyError));
  });
});
