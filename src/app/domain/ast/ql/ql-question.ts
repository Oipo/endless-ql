import {QuestionType} from '../question-type';
import {Statement} from './statement';
import {Location} from '../location';
import {ExpressionType} from './expressions/expression-type';
import {StatementVisitor} from './visitors/statement-visitor';

export class QlQuestion extends Statement {
  constructor(readonly name: string,
              readonly label: string,
              readonly type: QuestionType<any>,
              location: Location) {
    super(location);
  }

  getExpressionType(): ExpressionType {
    return this.type.toExpressionType();
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitQlQuestion(this);
  }
}
