import {ExpressionType, ExpressionTypeUtil} from '../expressions/expression-type';
import {StatementVisitor} from './statement-visitor';
import {Statement} from '../statement';
import {QlQuestion} from '../ql-question';
import {If} from '../if';
import {Form} from '../form';
import {ExpressionQuestion} from '../expression-question';
import {CheckExpressionTypeVisitor} from './check-expression-type-visitor';
import {locationToReadableMessage} from '../../location';
import {
  CircularDependencyError, DuplicateIdentifierError, ImpossibleIfConditionError, TypeError,
  UnknownQuestionError
} from '../../../errors';
import * as _ from 'lodash';
import {CollectStatementVariablesVisitor} from './collect-statement-variables-visitor';
import {CollectExpressionVariablesVisitor} from './collect-expression-variables-visitor';
import {CollectQuestionsVisitor} from './collect-questions-visitor';

export class CheckStatementTypeVisitor implements StatementVisitor<void> {
  private constructor(readonly allQuestions: ReadonlyArray<QlQuestion>) { }

  static visit(allQuestions: ReadonlyArray<QlQuestion>, statement: Statement): void {
    const visitor = new CheckStatementTypeVisitor(allQuestions);
    statement.accept(visitor);
  }

  visitExpressionQuestion(statement: ExpressionQuestion): void {
    const expressionType = CheckExpressionTypeVisitor.evaluate(statement.expression);
    if (! statement.expressionTypeValidForQuestion(expressionType)) {
      throw new TypeError(`Expression type ${ExpressionTypeUtil.toString(expressionType)} ` +
        `incompatible with question type ${statement.type.toString()}`
        + locationToReadableMessage(statement.location));
    }

    const variables = CollectExpressionVariablesVisitor.evaluate(statement.expression);
    const circularDependency = _.find(variables, ['identifier', statement.name]);
    if (circularDependency) {
      throw new CircularDependencyError(`The expression of question ${statement.name} references to itself`);
    }
  }

  visitForm(statement: Form): void {
    this.checkDuplicateIdentifiers();
    this.setVariableReferences(statement);

    for (const subStatement of statement.statements) {
      subStatement.accept(this);
    }
  }

  visitIf(statement: If): void {
    const expressionType = CheckExpressionTypeVisitor.evaluate(statement.condition);

    // throw errors if it is not available or if the type is wrong
    if (expressionType !== ExpressionType.BOOLEAN) {
      throw new TypeError(`Expected type boolean for ${ExpressionTypeUtil.toString(expressionType)} for usage in if statement `
        + locationToReadableMessage(statement.location));
    }

    // check if any of the referenced question(s) in the condition point to questions in the body
    const variables = CollectExpressionVariablesVisitor.evaluate(statement.condition);
    const questions = CollectQuestionsVisitor.visit(statement);

    for (const variable of variables) {
      const question = questions.find(q => q.name === variable.identifier);

      if (question) {
        throw new ImpossibleIfConditionError(`if statement ${locationToReadableMessage(statement.location)}` +
          `has question '${question.name}' both in condition and in body`);
      }
    }

    for (const subStatement of statement.statements) {
      subStatement.accept(this);
    }

    for (const subStatement of statement.elseStatements) {
      subStatement.accept(this);
    }
  }

  visitQlQuestion(stmt: QlQuestion): void {
    // nothing to check
  }

  private checkDuplicateIdentifiers(): void {
    if (_.uniqBy(this.allQuestions, 'name').length < this.allQuestions.length) {
      const groupedQuestions = _.groupBy(this.allQuestions, 'name');

      _.forEach(groupedQuestions, (value: QlQuestion[], key: string) => {
        if (value.length > 1) {
          throw new DuplicateIdentifierError(`Duplicate question with identifier ${key}`);
        }
      });
    }
  }

  private setVariableReferences(form: Form): void {
    const allVariables = CollectStatementVariablesVisitor.visit(form);

    for (const variable of allVariables) {
      const referencedQuestion = this.allQuestions.find(q => q.name === variable.identifier);
      if (referencedQuestion) {
        variable.referencedQuestion = referencedQuestion;
      } else {
        throw new UnknownQuestionError(`Question with identifier ${variable.identifier} was not found`);
      }
    }
  }
}
