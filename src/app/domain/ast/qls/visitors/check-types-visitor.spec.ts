import {QlQuestion} from '../../ql';
import {BooleanQuestionType, IntQuestionType} from '../../question-type';
import {emptyLoc} from '../../location';
import {Widget} from '../widget';
import {QlsQuestion} from '../qls-question';
import {CheckTypesVisitor} from './check-types-visitor';
import {WidgetType} from '../widget-type';
import {DefaultStyling} from '../default-styling';
import {Section} from '../section';

describe('Check types visitor', () => {
  const qlIntQuestion = new QlQuestion('name', 'label', new IntQuestionType(), emptyLoc);
  const qlBoolQuestion = new QlQuestion('missingname', 'label', new BooleanQuestionType(), emptyLoc);
  let qlQuestions: ReadonlyArray<QlQuestion>;

  const qlsIntQuestionWithWrongStyling = new QlsQuestion('name', new Widget(WidgetType.CHECKBOX), emptyLoc);

  const wrongDefaultStyling = new DefaultStyling(new IntQuestionType(), new Widget(WidgetType.CHECKBOX), [], emptyLoc);
  const sectionWithWrongDefaultStyling = new Section('Section', [], [], emptyLoc, wrongDefaultStyling);
  let visitor: CheckTypesVisitor;

  beforeEach(() => {
    qlQuestions = [qlIntQuestion, qlBoolQuestion];
    visitor = new CheckTypesVisitor(qlQuestions);
  });

  describe('visit question', () => {
    it('should throw error if the style of the question is not the same as the ql question type', () => {
      expect(() => visitor.visitQlsQuestion(qlsIntQuestionWithWrongStyling)).toThrow();
    });
  });

  describe('visit styleable', () => {
    it('should throw error if the default styling has incompatible types', () => {
      expect(() => visitor.visitSection(sectionWithWrongDefaultStyling)).toThrow();
    });
  });
});
