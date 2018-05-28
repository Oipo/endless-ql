import {QuestionType} from '../question-type';
import {QlQuestion} from './ql-question';
import {Location} from '../location';
import {Expression} from './expressions/expression';
import {ExpressionType} from './expressions/expression-type';
import {StatementVisitor} from './visitors/statement-visitor';

export class ExpressionQuestion extends QlQuestion {
  constructor(name: string, label: string, type: QuestionType<any>, readonly expression: Expression, location: Location) {
    super(name, label, type, location);
  }

  expressionTypeValidForQuestion(expressionType: ExpressionType): boolean {
    return this.type.isCompatibleWithExpression(expressionType);
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitExpressionQuestion(this);
  }
}
