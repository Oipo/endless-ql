import {QlsQuestion} from '../qls-question';
import {emptyLoc} from '../../location';
import {Widget} from '../widget';
import {WidgetType} from '../widget-type';
import {CollectStylesForQuestionVisitor, StylesForQlQuestion} from './collect-styles-for-question-visitor';
import {StringQuestionType} from '../../question-type';
import {Stylesheet} from '../stylesheet';
import {Section} from '../section';
import {DefaultStyling} from '../default-styling';
import {Style} from '../style';
import {HexValue, NumberValue} from '../style-value';
import {Page} from '../page';

describe('Collect styles for question visitor', () => {
  const textWidget = new Widget(WidgetType.TEXT);
  const colorStyle = new Style('color', new HexValue('#00FF00'), emptyLoc);
  const widthStyle = new Style('width', new NumberValue(200), emptyLoc);
  const defaultStyling = new DefaultStyling(new StringQuestionType(), textWidget, [colorStyle], emptyLoc);
  const pageStyling = new DefaultStyling(new StringQuestionType(), textWidget, [widthStyle], emptyLoc);
  const question = new QlsQuestion('name', textWidget , emptyLoc);
  const sectionWithoutQuestion = new Section('name', [], [], emptyLoc, defaultStyling);
  const unstyledQuestion = new QlsQuestion('name', Widget.Empty, emptyLoc);

  const unstyledSectionWithQuestion = new Section('sectionName', [], [question], emptyLoc);
  const unstyledSectionWithUnstyledQuestion = new Section('sectionName', [], [unstyledQuestion], emptyLoc);
  const styledSectionWithQuestion = new Section('sectionName', [], [question], emptyLoc, defaultStyling);
  const styledSectionWithUnstyledQuestion = new Section('sectionName', [], [unstyledQuestion], emptyLoc, defaultStyling);
  const sectionWithStyledSubSection = new Section('Section', [styledSectionWithUnstyledQuestion], [], emptyLoc);
  const styledSectionWithSubsectionWithStyledQuestion =
    new Section('Section', [unstyledSectionWithQuestion], [], emptyLoc, defaultStyling);
  const styledSectionwithUnstyledSubSection =
    new Section('Section', [unstyledSectionWithUnstyledQuestion], [], emptyLoc, defaultStyling);
  const sectionwithSubsectionWithoutQuestion =
    new Section('Section', [sectionWithoutQuestion], [] , emptyLoc, defaultStyling);

  const pageWithUnstyledSectionWithQuestion = new Page('Page', [unstyledSectionWithQuestion], emptyLoc, defaultStyling);
  const pageWithStyledSectionWithUnstyledQuestion = new Page('Page', [styledSectionWithUnstyledQuestion], emptyLoc, pageStyling);
  const pageWithoutQuestion = new Page('Page', [sectionWithoutQuestion], emptyLoc, pageStyling);

  const stylesheet = new Stylesheet('Sheet', [pageWithStyledSectionWithUnstyledQuestion], emptyLoc);
  const stylesheetWithoutQuestion = new Stylesheet('Sheet', [pageWithoutQuestion], emptyLoc);

  let visitor: CollectStylesForQuestionVisitor;

  beforeEach(() => {
    visitor = new CollectStylesForQuestionVisitor('name', 'text');
  });

  describe('visit question', () => {
    it('should return the right widget for a question', () => {
      const visitQuestionResult = visitor.visitQlsQuestion(question);
      expect(visitQuestionResult).toEqual(new StylesForQlQuestion([], textWidget));
    });

    it('should return styling with empty widget if no styling is defined for the question', () => {
      const visitQuestionResult = visitor.visitQlsQuestion(unstyledQuestion);
      expect(visitQuestionResult).toEqual(new StylesForQlQuestion([], Widget.Empty));
    });
  });

  describe('visit section', () => {
    it('should return the question styling if the question is in the section and has a defined widget', () => {
      const visitSectionResult = visitor.visitSection(unstyledSectionWithQuestion);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion([], textWidget));
    });

    it('should return default styling if the question is in the section without a defined widget but has no default styling', () => {
      const visitSectionResult = visitor.visitSection(unstyledSectionWithUnstyledQuestion);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion([], Widget.Empty));
    });

    it('should return question styling if the question is in the section and has a defined widget', () => {
      const visitSectionResult = visitor.visitSection(styledSectionWithQuestion);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion([], textWidget));
    });

    it('should return default styling if the question is in the section and has no defined widget', () => {
      const visitSectionResult = visitor.visitSection(styledSectionWithUnstyledQuestion);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion(defaultStyling.styles, defaultStyling.widget));
    });

    it('should return nothing if question is not in section', () => {
      const visitSectionResult = visitor.visitSection(sectionWithoutQuestion);
      expect(visitSectionResult).toBeUndefined();
    });

    it('should return default styling of subsection if the question is in the subsection and has no defined widget', () => {
      const visitSectionResult = visitor.visitSection(sectionWithStyledSubSection);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion(defaultStyling.styles, defaultStyling.widget));
    });

    it('should return styling of the question if question in subsection is styled', () => {
      const visitSectionResult = visitor.visitSection(styledSectionWithSubsectionWithStyledQuestion);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion([], textWidget));
    });

    it('should return default styling of the section if question is in subsection but both do not have valid styling', () => {
      const visitSectionResult = visitor.visitSection(styledSectionwithUnstyledSubSection);
      expect(visitSectionResult).toEqual(new StylesForQlQuestion(defaultStyling.styles, defaultStyling.widget));
    });

    it('should return nothing if question is not in section or subsection', () => {
      const visitSectionResult = visitor.visitSection(sectionwithSubsectionWithoutQuestion);
      expect(visitSectionResult).toBeUndefined();
    });
  });

  describe('visit page', () => {
    it('should return styling from question if question is in page and has styling', () => {
      const visitPageResult = visitor.visitPage(pageWithUnstyledSectionWithQuestion);
      expect(visitPageResult).toEqual(new StylesForQlQuestion([], textWidget));
    });

    it('should return default from section if page and section have default styling', () => {
      const visitPageResult = visitor.visitPage(pageWithStyledSectionWithUnstyledQuestion);
      expect(visitPageResult).toEqual(new StylesForQlQuestion([colorStyle], textWidget));
    });

    it('should return nothing if question is not in sections', () => {
      const visitPageResult = visitor.visitPage(pageWithoutQuestion);
      expect(visitPageResult).toBeUndefined();
    });
  });

  describe('visit stylesheet', () => {
    it('should collect styling from page', () => {
      const visitStylesheetResult = visitor.visitStylesheet(stylesheet);
      expect(visitStylesheetResult).toEqual(new StylesForQlQuestion([colorStyle], textWidget));
    });

    it('should throw error if no styles are found', () => {
      expect(() => visitor.visitStylesheet(stylesheetWithoutQuestion)).toThrow();
    });
  });
});
