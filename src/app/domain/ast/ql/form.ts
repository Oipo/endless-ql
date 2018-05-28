import {QuestionBase} from '../../angular-questions/question-base';
import {Statement} from './statement';
import * as _ from 'lodash';
import {DuplicateIdentifierError, UnknownQuestionError} from '../../errors';
import {QlQuestion} from './ql-question';
import {Location} from '../location';

export class Form {
  constructor(readonly name: string, readonly statements: Statement[], readonly location: Location) {
  }

  toFormQuestion(): QuestionBase<any>[] {
    let formQuestions: QuestionBase<any>[] = [];

    for (const index in this.statements) {
      const statement = this.statements[index];

      if (!statement) {
        continue;
      }

      formQuestions = formQuestions.concat(statement.toFormQuestion(formQuestions));
    }

    return formQuestions.sort((a, b) => a.order - b.order);
  }

  checkForm(): void {
    const allQuestions = this.getAllQuestions();

    this.checkDuplicateIdentifiers(allQuestions);

    this.setVariableReferences(allQuestions);

    for (const statement of this.statements) {
      statement.checkType(allQuestions);
    }
  }

  getAllQuestions(): QlQuestion[] {
    const allQuestions = [];
    for (const statement of this.statements) {
      const questions = statement.getQuestions();

      if (questions.length > 0) {
        allQuestions.push(statement.getQuestions());
      }
    }
    return _.flatten(allQuestions);
  }

  private checkDuplicateIdentifiers(allQuestions: QlQuestion[]): void {
    if (_.uniqBy(allQuestions, 'name').length < allQuestions.length) {
      const groupedQuestions = _.groupBy(allQuestions, 'name');

      _.forEach(groupedQuestions, (value: QlQuestion[], key: string) => {
        if (value.length > 1) {
          throw new DuplicateIdentifierError(`Duplicate question with identifier ${key}`);
        }
      });
    }
  }

  private setVariableReferences(allQuestions: QlQuestion[]): void {
    let allVariables = [];
    for (const statement of this.statements) {
      allVariables.push(statement.getVariables());
    }
    allVariables = _.flatten(allVariables);

    for (const variable of allVariables) {
      const referencedQuestion = allQuestions.find(q => q.name === variable.identifier);
      if (referencedQuestion) {
        variable.referencedQuestion = referencedQuestion;
      } else {
        throw new UnknownQuestionError(`Question with identifier ${variable.identifier} was not found`);
      }
    }
  }

}
