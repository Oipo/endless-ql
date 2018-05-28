import {ExpressionType} from './ql/expressions/expression-type';
import {WidgetType} from './qls/index';

export interface QuestionType<T> {
  toString(): string;
  getDefaultValue(): T;
  isCompatibleWithExpression(type: ExpressionType): boolean;
  isCompatibleWithWidget(type: WidgetType): boolean;
  getCompatibleWidgetTypes(): string;
  toExpressionType(): ExpressionType;
  toHtmlInputType(): string;
}

export class IntQuestionType implements QuestionType<number> {
  toString(): string {
    return 'int';
  }

  getDefaultValue(): number {
    return 0;
  }

  isCompatibleWithExpression(type: ExpressionType): boolean {
    return type === ExpressionType.NUMBER;
  }

  isCompatibleWithWidget(type: WidgetType): boolean {
    return type === WidgetType.TEXT || type === WidgetType.SLIDER || type === WidgetType.SPINBOX;
  }

  toExpressionType(): ExpressionType {
    return ExpressionType.NUMBER;
  }

  toHtmlInputType(): string {
    return 'number';
  }

  getCompatibleWidgetTypes(): string {
    return 'text, slider, spinbox';
  }
}

export class BooleanQuestionType implements QuestionType<boolean> {

  toString(): string {
    return 'boolean';
  }

  getDefaultValue(): boolean {
    return false;
  }

  isCompatibleWithExpression(type: ExpressionType): boolean {
    return type === ExpressionType.BOOLEAN;
  }

  isCompatibleWithWidget(type: WidgetType): boolean {
    return type === WidgetType.CHECKBOX || type === WidgetType.RADIO || type === WidgetType.DROPDOWN;
  }

  toExpressionType(): ExpressionType {
    return ExpressionType.BOOLEAN;
  }

  toHtmlInputType(): string {
    return 'boolean';
  }

  getCompatibleWidgetTypes(): string {
    return 'checkbox, radio, dropdown';
  }
}

export class StringQuestionType implements QuestionType<string> {
  toString(): string {
    return 'string';
  }

  getDefaultValue(): string {
    return '';
  }

  isCompatibleWithExpression(type: ExpressionType): boolean {
    return type === ExpressionType.STRING;
  }

  isCompatibleWithWidget(type: WidgetType): boolean {
    return type === WidgetType.TEXT;
  }

  toExpressionType(): ExpressionType {
    return ExpressionType.STRING;
  }

  toHtmlInputType(): string {
    return 'text';
  }

  getCompatibleWidgetTypes(): string {
    return 'text';
  }
}

export class DateQuestionType implements QuestionType<Date> {
  toString(): string {
    return 'date';
  }

  getDefaultValue(): Date {
    return new Date();
  }

  isCompatibleWithExpression(type: ExpressionType): boolean {
    return type === ExpressionType.DATE;
  }

  isCompatibleWithWidget(type: WidgetType): boolean {
    return type === WidgetType.TEXT;
  }

  toExpressionType(): ExpressionType {
    return ExpressionType.DATE;
  }

  toHtmlInputType(): string {
    return 'date';
  }

  getCompatibleWidgetTypes(): string {
    return 'text';
  }
}
