import {Statement} from '../statement';
import {StatementVisitor} from './statement-visitor';
import {ExpressionQuestion} from '../expression-question';
import {Form} from '../form';
import {If} from '../if';
import {QlQuestion} from '../ql-question';
import {QuestionBase} from '../../../angular-questions/question-base';
import {QuestionFactory} from '../../../../factories/question-factory';
import {FormGroup} from '@angular/forms';
import {EvaluateExpressionVisitor} from './evaluate-expression-visitor';

export class ConvertToFormQuestionsVisitor implements StatementVisitor<QuestionBase<any>[]> {
  static visit(statement: Statement): QuestionBase<any>[] {
    const visitor = new ConvertToFormQuestionsVisitor();
    return statement.accept(visitor);
  }

  visitExpressionQuestion(statement: ExpressionQuestion): QuestionBase<any>[] {
    const question = QuestionFactory.toFormQuestion(statement.name, statement.label, statement.type, () => true);
    question.toCalculatedQuestion((form: FormGroup) => {
      return EvaluateExpressionVisitor.visit(form, statement.expression).getValue();
    });
    return [question];
  }

  visitForm(formStatement: Form): QuestionBase<any>[] {
    let questionsToReturn: QuestionBase<any>[] = [];

    for (const statement of formStatement.statements) {
      questionsToReturn = questionsToReturn.concat(statement.accept(this));
    }

    return questionsToReturn;
  }

  visitIf(ifStatement: If): QuestionBase<any>[] {
    const questionsToReturn: QuestionBase<any>[] = [];

    for (const statement of ifStatement.statements) {
      const questions = statement.accept(this);

      for (const question of questions) {
        const previousCondition = question.hiddenCondition;
        question.hiddenCondition = ((form: FormGroup) => {
          const outcome = EvaluateExpressionVisitor.visit(form, ifStatement.condition).getValue();
          return previousCondition(form) && outcome;
        });

        questionsToReturn.push(question);
      }
    }

    for (const statement of ifStatement.elseStatements) {
      const questions = statement.accept(this);

      for (const question of questions) {
        const previousCondition = question.hiddenCondition;
        question.hiddenCondition = ((form: FormGroup) => {
          const outcome = EvaluateExpressionVisitor.visit(form, ifStatement.condition).getValue();
          return previousCondition(form) && !outcome;
        });

        questionsToReturn.push(question);
      }
    }

    return questionsToReturn;
  }

  visitQlQuestion(statement: QlQuestion): QuestionBase<any>[] {
    return [QuestionFactory.toFormQuestion(statement.name, statement.label, statement.type, () => true)];
  }
}
