import {QlQuestion} from '../../ql';
import {BooleanQuestionType, IntQuestionType} from '../../question-type';
import {emptyLoc} from '../../location';
import {CheckIdentifiersVisitor} from './check-identifiers-visitor';
import {Widget} from '../widget';
import {QlsQuestion} from '../qls-question';
import {Page} from '../page';
import {Section} from '../section';
import {Stylesheet} from '../stylesheet';

describe('Check identifiers visitor', () => {
  const qlIntQuestion = new QlQuestion('name', 'label', new IntQuestionType(), emptyLoc);
  const qlBoolQuestion = new QlQuestion('missingname', 'label', new BooleanQuestionType(), emptyLoc);
  const noQlQuestion = new QlsQuestion('notFound', Widget.Empty, emptyLoc);
  const qlsQuestion = new QlsQuestion('name', Widget.Empty, emptyLoc);
  const section = new Section('Section', [], [qlsQuestion],  emptyLoc);
  const section2 = new Section('Section', [], [qlsQuestion],  emptyLoc);
  const pageWithDuplicateQls = new Page('Page', [section, section2], emptyLoc);
  const page = new Page('Page', [section], emptyLoc);
  const sectionWithSubSection = new Section('Section', [section], [qlsQuestion], emptyLoc);
  const styleSheet = new Stylesheet('sheet', [page], emptyLoc);
  let qlQuestions: ReadonlyArray<QlQuestion>;

  let visitor: CheckIdentifiersVisitor;

  beforeEach(() => {
    qlQuestions = [qlIntQuestion, qlBoolQuestion];
    visitor = new CheckIdentifiersVisitor(qlQuestions);
  });

    it('should throw error if the question is not found in ql questions', () => {
      expect(() => visitor.visitQlsQuestion(noQlQuestion)).toThrow();
    });

    it('should throw error if the qlsQuestion is defined in multiple sections', () => {
      expect(() => visitor.visitPage(pageWithDuplicateQls)).toThrow();
      expect(() => visitor.visitSection(sectionWithSubSection)).toThrow();
    });

    it('should throw error if not all qlQuestions are defined in qls', () => {
      expect(() => visitor.visitStylesheet(styleSheet)).toThrow();
    });
});
