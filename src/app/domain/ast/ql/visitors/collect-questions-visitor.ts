import {Statement} from '../statement';
import {StatementVisitor} from './statement-visitor';
import {QlQuestion} from '../ql-question';
import {ExpressionQuestion} from '../expression-question';
import {Form} from '../form';
import {If} from '../if';

export class CollectQuestionsVisitor implements StatementVisitor<void> {
  private questions: QlQuestion[];

  private constructor() {
    this.questions = [];
  }

  static visit(statement: Statement): ReadonlyArray<QlQuestion> {
    const visitor = new CollectQuestionsVisitor();
    statement.accept(visitor);
    return visitor.questions;
  }

  visitExpressionQuestion(statement: ExpressionQuestion): void {
    this.questions.push(statement);
  }

  visitForm(formStatement: Form): void {
    for (const statement of formStatement.statements) {
      statement.accept(this);
    }
  }

  visitIf(ifStatement: If): void {
    for (const statement of ifStatement.statements) {
      statement.accept(this);
    }

    for (const statement of ifStatement.elseStatements) {
      statement.accept(this);
    }
  }

  visitQlQuestion(statement: QlQuestion): void {
    this.questions.push(statement);
  }
}
