import {Variable} from './expressions/variable';
import {emptyLoc} from '../location';
import {QlQuestion} from './ql-question';
import {IntQuestionType} from '../question-type';
import {If} from './if';
import {BooleanLiteral} from './expressions/literals/boolean-literal';
import {DateLiteral} from './expressions/literals/date-literal';
import {NumberLiteral} from './expressions/literals/number-literal';
import {StringLiteral} from './expressions/literals/string-literal';
import {CheckStatementTypeVisitor} from './visitors/check-statement-type-visitor';
import {CollectStatementVariablesVisitor} from './visitors/collect-statement-variables-visitor';
import {CollectQuestionsVisitor} from './visitors/collect-questions-visitor';

describe('if statement', () => {
  it('Should check for impossible if statements', () => {
    const expression = new Variable('questionInBody', emptyLoc);
    const question = new QlQuestion('questionInBody', '', new IntQuestionType(), emptyLoc);
    const ifStatement = new If(expression, [question], [], emptyLoc);

    expect(() => CheckStatementTypeVisitor.visit([question], ifStatement)).toThrow();
  });

  it('Should check if expression type is boolean', () => {
    const boolExpression = new BooleanLiteral(true, emptyLoc);
    const dateExpression = new DateLiteral(new Date(), emptyLoc);
    const numberExpression = new NumberLiteral(5, emptyLoc);
    const stringExpression = new StringLiteral('s', emptyLoc);
    const ifBoolStatement = new If(boolExpression, [], [], emptyLoc);
    const ifDateStatement = new If(dateExpression, [], [], emptyLoc);
    const ifNumberStatement = new If(numberExpression, [], [], emptyLoc);
    const ifStringStatement = new If(stringExpression, [], [], emptyLoc);

    expect(() => CheckStatementTypeVisitor.visit([], ifBoolStatement)).not.toThrow();

    expect(() => CheckStatementTypeVisitor.visit([], ifDateStatement)).toThrow();

    expect(() => CheckStatementTypeVisitor.visit([], ifNumberStatement)).toThrow();

    expect(() => CheckStatementTypeVisitor.visit([], ifStringStatement)).toThrow();
  });

  it('Should return correct statements', () => {
    const question = new QlQuestion('question', '', new IntQuestionType(), emptyLoc);
    const elseQuestion = new QlQuestion('elseQuestion', '', new IntQuestionType(), emptyLoc);
    const ifStatement = new If(null, [question], [elseQuestion], emptyLoc);

    const statements = CollectQuestionsVisitor.visit(ifStatement);
    expect(statements.length).toBe(2);
    expect(statements[0].name).toBe('question');
    expect(statements[1].name).toBe('elseQuestion');
  });

  it('Should return variables of sub-ifs', () => {
    const expression = new Variable('expression', emptyLoc);
    const subExpression = new Variable('subExpression', emptyLoc);
    const subIfStatement = new If(expression, [], [], emptyLoc);
    const ifStatement = new If(subExpression, [subIfStatement], [], emptyLoc);

    const variables = CollectStatementVariablesVisitor.visit(ifStatement);

    expect(variables.length).toBe(2);
    expect(variables[0].identifier).toBe('expression');
    expect(variables[1].identifier).toBe('subExpression');
  });
});
