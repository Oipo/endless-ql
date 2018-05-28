import {ExpressionQuestion} from '../expression-question';
import {Form} from '../form';
import {If} from '../if';
import {QlQuestion} from '../ql-question';

export interface StatementVisitor<T> {
  visitExpressionQuestion(statement: ExpressionQuestion): T;

  visitForm(statement: Form): T;

  visitIf(statement: If): T;

  visitQlQuestion(statement: QlQuestion): T;
}
