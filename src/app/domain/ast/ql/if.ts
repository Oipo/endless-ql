import {Statement} from './statement';
import {QuestionBase} from '../../angular-questions/question-base';
import {FormGroup} from '@angular/forms';
import {QlQuestion} from './ql-question';
import * as _ from 'lodash';
import {ImpossibleIfConditionError, TypeError} from '../../errors';
import {Location} from '../location';
import {Expression, LiteralType} from './expressions/expression';
import {ExpressionType, ExpressionTypeUtil} from './expressions/expression-type';
import {Variable} from './expressions/variable';
import {EvaluateExpressionVisitor} from './visitors/evaluate-expression-visitor';

export class If extends Statement {
  constructor(
    readonly condition: Expression,
    readonly statements: Statement[],
    readonly elseStatements: Statement[],
    location: Location) {
    super(location);
  }

  getVariables(): Variable[] {
    let allVariables = [];
    const allStatements = this.statements.concat(this.elseStatements);
    for (const statement of allStatements) {
      allVariables.push(statement.getVariables());
    }
    allVariables.push(this.condition.getVariables());
    allVariables = _.flatten(allVariables);
    return allVariables;
  }

  checkType(allQuestions: QlQuestion[]): void {
    const expressionType = this.condition.checkType(allQuestions);

    // throw errors if it is not available or if the type is wrong
    if (expressionType !== ExpressionType.BOOLEAN) {
      throw new TypeError(`Expected type boolean for ${ExpressionTypeUtil.toString(expressionType)} for usage in if statement `
        + this.getLocationErrorMessage());
    }

    // check if any of the referenced question(s) in the condition point to questions in the body
    const variables = this.condition.getVariables();
    const questions = this.getQuestions();

    for (const variable of variables) {
      const question = questions.find(q => q.name === variable.identifier);

      if (question) {
        throw new ImpossibleIfConditionError(`if statement ${this.getLocationErrorMessage()}` +
          `has question '${question.name}' both in condition and in body`);
      }
    }
  }

  getQuestions(): QlQuestion[] {
    const subQuestions = [];

    // get questions of statements in body of the if
    for (const statement of this.statements) {
      const questions = statement.getQuestions();

      if (questions.length > 0) {
        subQuestions.push(statement.getQuestions());
      }
    }

    for (const statement of this.elseStatements) {
      const questions = statement.getQuestions();

      if (questions.length > 0) {
        subQuestions.push(statement.getQuestions());
      }
    }

    return _.flattenDeep(subQuestions);
  }

  toFormQuestion(formQuestions: ReadonlyArray<QuestionBase<any>>,
                 condition?: (form: FormGroup) => boolean): ReadonlyArray<QuestionBase<any>> {

    // generate function that should be evaluated for the condition
    const conditionFunction = ((form: FormGroup) => {
      const outcome = EvaluateExpressionVisitor.evaluate(form, this.condition).getValue();
      if (condition) {
        return condition(form) && outcome;
      }
      return outcome;
    });

    const elseConditionFunction = ((form: FormGroup) => {
      return !conditionFunction(form);
    });

    return this.generateQuestionsForBody(formQuestions, conditionFunction, elseConditionFunction);
  }

  private generateQuestionsForBody(formQuestions: ReadonlyArray<QuestionBase<any>>,
                                   conditionFunction: (form: FormGroup) => LiteralType,
                                   elseConditionFunction: (form: FormGroup) => LiteralType): ReadonlyArray<QuestionBase<any>> {
    let formQuestionsToReturn: QuestionBase<any>[] = [];
    for (const statement of this.statements) {
      formQuestionsToReturn = formQuestionsToReturn.concat(statement.toFormQuestion(formQuestions, conditionFunction));
    }

    for (const statement of this.elseStatements) {
      formQuestionsToReturn = formQuestionsToReturn.concat(statement.toFormQuestion(formQuestions, elseConditionFunction));
    }

    return formQuestionsToReturn;
  }
}
