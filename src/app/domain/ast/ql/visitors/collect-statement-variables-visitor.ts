import {StatementVisitor} from './statement-visitor';
import {Variable} from '../';
import {ExpressionQuestion} from '../expression-question';
import {Form} from '../form';
import {If} from '../if';
import {QlQuestion} from '../ql-question';
import {Statement} from '../statement';
import {CollectExpressionVariablesVisitor} from './collect-expression-variables-visitor';

export class CollectStatementVariablesVisitor implements StatementVisitor<void> {
  private variables: Variable[];

  private constructor() {
    this.variables = [];
  }

  static visit(statement: Statement): ReadonlyArray<Variable> {
    const visitor = new CollectStatementVariablesVisitor();
    statement.accept(visitor);
    return visitor.variables;
  }

  visitExpressionQuestion(statement: ExpressionQuestion): void {
    this.variables = this.variables.concat(CollectExpressionVariablesVisitor.evaluate(statement.expression));
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

    this.variables = this.variables.concat(CollectExpressionVariablesVisitor.evaluate(ifStatement.condition));
  }

  visitQlQuestion(stmt: QlQuestion): void {
    // nothing to do
  }

}
