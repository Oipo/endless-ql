import {BooleanLiteral} from '../expressions/literals/boolean-literal';
import {ExpressionType} from '../expressions/expression-type';
import {AndExpression, OrExpression} from '../expressions/logical-expression';
import {AddExpression, DivideExpression, MultiplyExpression, SubtractExpression} from '../expressions/arithmetic-expression';
import {NegateExpression, NegativeExpression} from '../expressions/unary-expression';
import {emptyLoc} from '../../location';
import {
  GreaterThanEqualExpression, GreaterThanExpression, LessThanEqualExpression,
  LessThanExpression
} from '../expressions/comparison-expression';
import {EqualExpression, UnequalExpression} from '../expressions/equality-expression';
import {FormControl, FormGroup} from '@angular/forms';
import {Variable} from '../expressions/variable';
import {DateLiteral, NumberLiteral, StringLiteral} from '../';
import {EvaluateExpressionVisitor} from './evaluate-expression-visitor';
import {CheckExpressionTypeVisitor} from './check-expression-type-visitor';
import {QlQuestion} from '../ql-question';
import {IntQuestionType} from '../../question-type';

const stringLiteral = new StringLiteral('string', emptyLoc);
const dateLiteral = new DateLiteral(new Date('01-01-1990'), emptyLoc);
const booleanLiteral = new BooleanLiteral(true, emptyLoc);
const intLiteral = new NumberLiteral(5, emptyLoc);
const secondIntLiteral = new NumberLiteral(8, emptyLoc);

const andExpression = new AndExpression(booleanLiteral, booleanLiteral,  emptyLoc);
const orExpression = new OrExpression(booleanLiteral, booleanLiteral,  emptyLoc);

const timesExpression = new MultiplyExpression(intLiteral, secondIntLiteral, emptyLoc);
const divideExpression = new DivideExpression(intLiteral, intLiteral, emptyLoc);
const addExpression = new AddExpression(secondIntLiteral, intLiteral, emptyLoc);
const subtractExpression = new SubtractExpression(secondIntLiteral, secondIntLiteral,  emptyLoc);
const lessThanExpression = new LessThanExpression(intLiteral, secondIntLiteral, emptyLoc);
const greaterThanExpression = new GreaterThanExpression(intLiteral, intLiteral,  emptyLoc);
const lessEqualExpression = new LessThanEqualExpression(secondIntLiteral, intLiteral,  emptyLoc);
const greaterEqualExpression = new GreaterThanEqualExpression(secondIntLiteral, secondIntLiteral, emptyLoc);

const equalExpression = new EqualExpression(intLiteral, intLiteral, emptyLoc);
const unequalExpression = new UnequalExpression(booleanLiteral, booleanLiteral,  emptyLoc);

const negativeExpression = new NegativeExpression(intLiteral, emptyLoc);
const negateExpression = new NegateExpression(booleanLiteral, emptyLoc);

const variableExpression = new Variable('booleanQuestion', emptyLoc);
variableExpression.referencedQuestion = new QlQuestion('booleanQuestion', 'label', new IntQuestionType(), emptyLoc);

describe('Expressions', () => {
  describe('should evaluate', () => {
    const form = new FormGroup({booleanQuestion: new FormControl({value: ''})});
    it('literals', () => {
      expect(EvaluateExpressionVisitor.visit(form, stringLiteral).getValue()).toBe('string');
      expect(EvaluateExpressionVisitor.visit(form, dateLiteral).getValue()).toEqual(new Date('01-01-1990'));
      expect(EvaluateExpressionVisitor.visit(form, booleanLiteral).getValue()).toBe(true);
      expect(EvaluateExpressionVisitor.visit(form, intLiteral).getValue()).toBe(5);
    });

    it('logical expressions', () => {
      expect(EvaluateExpressionVisitor.visit(form, andExpression).getValue()).toBe(true);
      expect(EvaluateExpressionVisitor.visit(form, orExpression).getValue()).toBe(true);
    });

    it('arithmetic expressions', () => {
      expect(EvaluateExpressionVisitor.visit(form, timesExpression).getValue()).toBe(40.0);
      expect(EvaluateExpressionVisitor.visit(form, divideExpression).getValue()).toBe(1);
      expect(EvaluateExpressionVisitor.visit(form, addExpression).getValue()).toBe(13.0);
      expect(EvaluateExpressionVisitor.visit(form, subtractExpression).getValue()).toBe(0.0);
    });

    it('comparison expressions', () => {
      expect(EvaluateExpressionVisitor.visit(form, lessThanExpression).getValue()).toBe(true);
      expect(EvaluateExpressionVisitor.visit(form, greaterThanExpression).getValue()).toBe(false);
      expect(EvaluateExpressionVisitor.visit(form, lessEqualExpression).getValue()).toBe(false);
      expect(EvaluateExpressionVisitor.visit(form, greaterEqualExpression).getValue()).toBe(true);
    });

    it('equality expressions', () => {
      expect(EvaluateExpressionVisitor.visit(form, equalExpression).getValue()).toBe(true);
      expect(EvaluateExpressionVisitor.visit(form, unequalExpression).getValue()).toBe(false);
    });

    it('unary expressions', () => {
      expect(EvaluateExpressionVisitor.visit(form, negativeExpression).getValue()).toBe(-5);
      expect(EvaluateExpressionVisitor.visit(form, negateExpression).getValue()).toBe(false);
    });

    it('variable expressions', () => {
      expect(EvaluateExpressionVisitor.visit(form, variableExpression).getValue()).toBeUndefined();

      form.controls['booleanQuestion'].setValue(true);
      expect(EvaluateExpressionVisitor.visit(form, variableExpression).getValue()).toBe(true);

      const unknownIdentifierVariableExpression = new Variable('identifier', emptyLoc);
      expect(() => EvaluateExpressionVisitor.visit(form, unknownIdentifierVariableExpression).getValue()).toThrow();
    });
  });
  describe('Should check and return type', () => {
    it('logical expressions', () => {
      expect(CheckExpressionTypeVisitor.evaluate(andExpression)).toBe(ExpressionType.BOOLEAN);
      expect(() => CheckExpressionTypeVisitor.evaluate(new AndExpression(intLiteral, booleanLiteral, emptyLoc)
      )).toThrowError();
    });

    it('arithmetic expressions', () => {
      expect(CheckExpressionTypeVisitor.evaluate(timesExpression)).toBe(ExpressionType.NUMBER);
      expect(() => CheckExpressionTypeVisitor.evaluate(new DivideExpression(intLiteral, booleanLiteral, emptyLoc)
        )).toThrowError();
    });

    it('comparison expressions', () => {
      expect(CheckExpressionTypeVisitor.evaluate(lessThanExpression)).toBe(ExpressionType.BOOLEAN);
      expect(() => CheckExpressionTypeVisitor.evaluate(new GreaterThanExpression(intLiteral, booleanLiteral, emptyLoc)
        )).toThrowError();
    });

    it('equality expressions', () => {
      expect(CheckExpressionTypeVisitor.evaluate(equalExpression)).toBe(ExpressionType.BOOLEAN);
      expect(() => CheckExpressionTypeVisitor.evaluate(new EqualExpression(intLiteral, booleanLiteral, emptyLoc)
        )).toThrowError();
    });

    it('unary expressions', () => {
      expect(CheckExpressionTypeVisitor.evaluate(negativeExpression)).toBe(ExpressionType.NUMBER);
      expect(CheckExpressionTypeVisitor.evaluate(negateExpression)).toBe(ExpressionType.BOOLEAN);
      expect(() => CheckExpressionTypeVisitor.evaluate(new NegativeExpression(booleanLiteral,  emptyLoc)
        )).toThrowError();
      expect(() => CheckExpressionTypeVisitor.evaluate(new NegateExpression(secondIntLiteral, emptyLoc)
        )).toThrowError();
    });

    it('expressions should type check input literals', () => {
      const literalArray = [stringLiteral, dateLiteral, booleanLiteral, intLiteral, secondIntLiteral];

      for (let i = 0; i < literalArray.length; i++) {
        for (let j = 0; j < literalArray.length; j++) {
          if (CheckExpressionTypeVisitor.evaluate(literalArray[i]) === ExpressionType.BOOLEAN &&
              CheckExpressionTypeVisitor.evaluate(literalArray[j]) === ExpressionType.BOOLEAN) {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new AndExpression(literalArray[i], literalArray[j], emptyLoc));
            }).not.toThrow();
          } else {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new AndExpression(literalArray[i], literalArray[j],  emptyLoc));
            }).toThrow();
          }
        }
      }

      for (let i = 0; i < literalArray.length; i++) {
        for (let j = 0; j < literalArray.length; j++) {
          const left = CheckExpressionTypeVisitor.evaluate(literalArray[i]);
          const right = CheckExpressionTypeVisitor.evaluate(literalArray[j]);
          if (left === ExpressionType.NUMBER && right === ExpressionType.NUMBER ||
              left === ExpressionType.DATE && right === ExpressionType.NUMBER ||
              left === ExpressionType.STRING && right === ExpressionType.STRING) {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new AddExpression(literalArray[i], literalArray[j],  emptyLoc));
            }).not.toThrow();
          } else {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new AddExpression(literalArray[i], literalArray[j],  emptyLoc));
            }).toThrow();
          }
        }
      }

      for (let i = 0; i < literalArray.length; i++) {
        for (let j = 0; j < literalArray.length; j++) {
          if (CheckExpressionTypeVisitor.evaluate(literalArray[i]) === ExpressionType.NUMBER &&
              CheckExpressionTypeVisitor.evaluate(literalArray[j]) === ExpressionType.NUMBER) {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new LessThanExpression(literalArray[i], literalArray[j],  emptyLoc));
            }).not.toThrow();
          } else {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new LessThanExpression(literalArray[i], literalArray[j],  emptyLoc));
            }).toThrow();
          }
        }
      }

      for (let i = 0; i < literalArray.length; i++) {
        for (let j = 0; j < literalArray.length; j++) {
          if (CheckExpressionTypeVisitor.evaluate(literalArray[i]) === CheckExpressionTypeVisitor.evaluate(literalArray[j])) {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new EqualExpression(literalArray[i], literalArray[j],  emptyLoc));
            }).not.toThrow();
          } else {
            expect(() => {
              CheckExpressionTypeVisitor.evaluate(new EqualExpression(literalArray[i], literalArray[j], emptyLoc));
            }).toThrow();
          }
        }
      }

      for (let i = 0; i < literalArray.length; i++) {
        if (CheckExpressionTypeVisitor.evaluate(literalArray[i]) === ExpressionType.NUMBER) {
          expect(() => {
            CheckExpressionTypeVisitor.evaluate(new NegativeExpression(literalArray[i], emptyLoc));
          }).not.toThrow();
        } else {
          expect(() => {
            CheckExpressionTypeVisitor.evaluate(new NegativeExpression(literalArray[i], emptyLoc));
          }).toThrow();
        }
      }

      for (let i = 0; i < literalArray.length; i++) {
        if (CheckExpressionTypeVisitor.evaluate(literalArray[i]) === ExpressionType.BOOLEAN) {
          expect(() => {
            CheckExpressionTypeVisitor.evaluate(new NegateExpression(literalArray[i],  emptyLoc));
          }).not.toThrow();
        } else {
          expect(() => {
            CheckExpressionTypeVisitor.evaluate(new NegateExpression(literalArray[i],  emptyLoc));
          }).toThrow();
        }
      }
    });
  });
});
