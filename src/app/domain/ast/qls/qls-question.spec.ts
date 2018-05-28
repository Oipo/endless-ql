import {QlsQuestion} from './qls-question';
import {QlQuestion as QlQuestion} from '../ql/ql-question';
import {Widget} from './widget';
import {WidgetType} from './widget-type';
import {emptyLoc} from '../location';
import {Style} from './style';
import {NumberValue} from './style-value';
import {DefaultStyling} from './default-styling';
import {BooleanQuestionType, IntQuestionType} from '../question-type';

describe('QLS QlQuestion', () => {
  it('QlQuestion without default should return self with proper style', () => {
    const question = new QlsQuestion('name', new Widget(WidgetType.NONE, []), emptyLoc, null);

    let questionsWithStyles = question.getQuestions([], Widget.Empty);
    expect(questionsWithStyles.length).toBe(1);
    expect(questionsWithStyles[0].question).toBe(question);
    expect(questionsWithStyles[0].styles.length).toBe(0);

    questionsWithStyles = question.getQuestions([new Style('name', new NumberValue(2), emptyLoc)], Widget.Empty);
    expect(questionsWithStyles.length).toBe(1);
    expect(questionsWithStyles[0].question).toBe(question);
    expect(questionsWithStyles[0].styles.length).toBe(1);
    expect(questionsWithStyles[0].styles[0].name).toBe('name');
    expect(questionsWithStyles[0].styles[0].value.getValueAsString()).toBe('2px');
  });

  it('QlQuestion with default should return self with proper style', () => {
    const question = new QlsQuestion('name', new Widget(WidgetType.NONE, []), emptyLoc,
      new DefaultStyling(new IntQuestionType(), new Widget(WidgetType.TEXT, []),
        [new Style('name', new NumberValue(1), emptyLoc)], emptyLoc));

    let questionsWithStyles = question.getQuestions([], Widget.Empty);
    expect(questionsWithStyles.length).toBe(1);
    expect(questionsWithStyles[0].question).toBe(question);
    expect(questionsWithStyles[0].styles.length).toBe(1);
    expect(questionsWithStyles[0].styles[0].name).toBe('name');
    expect(questionsWithStyles[0].styles[0].value.getValueAsString()).toBe('1px');

    questionsWithStyles = question.getQuestions([new Style('name', new NumberValue(2), emptyLoc)], Widget.Empty);
    expect(questionsWithStyles.length).toBe(1);
    expect(questionsWithStyles[0].question).toBe(question);
    expect(questionsWithStyles[0].styles.length).toBe(2);
    expect(questionsWithStyles[0].styles[0].name).toBe('name');
    expect(questionsWithStyles[0].styles[0].value.getValueAsString()).toBe('2px');
    expect(questionsWithStyles[0].styles[1].name).toBe('name');
    expect(questionsWithStyles[0].styles[1].value.getValueAsString()).toBe('1px');
  });

  it('Should throw if question is missing in input', () => {
    const question = new QlsQuestion('name', new Widget(WidgetType.NONE, []), emptyLoc, null);
    expect(() => question.checkStylesheet([], [])).toThrow();
  });

  it('Should throw if question type is missing doesn\'t match ql question type', () => {
    const qlsQuestions: QlsQuestion[] = [];

    for (let i = WidgetType.RADIO; i < WidgetType.SLIDER; i++) {
      qlsQuestions.push(new QlsQuestion(`name`, new Widget(i, []), emptyLoc, null));
    }

    const qlIntQuestion = new QlQuestion('name', 'label', new IntQuestionType(), emptyLoc);
    const qlBoolQuestion = new QlQuestion('name', 'label', new BooleanQuestionType(), emptyLoc);
    for (let i = 0; i < qlsQuestions.length; i++) {
      if (qlsQuestions[i].widget.type === WidgetType.SPINBOX || qlsQuestions[i].widget.type === WidgetType.TEXT) {
        expect(() => qlsQuestions[i].checkStylesheet([], [qlIntQuestion])).not.toThrow();
      } else {
        expect(() => qlsQuestions[i].checkStylesheet([], [qlIntQuestion])).toThrow();
      }
    }

    for (let i = 0; i < qlsQuestions.length; i++) {
      if (qlsQuestions[i].widget.type === WidgetType.CHECKBOX || qlsQuestions[i].widget.type === WidgetType.RADIO ||
        qlsQuestions[i].widget.type === WidgetType.DROPDOWN) {
        expect(() => qlsQuestions[i].checkStylesheet([], [qlBoolQuestion])).not.toThrow();
      } else {
        expect(() => qlsQuestions[i].checkStylesheet([], [qlBoolQuestion])).toThrow();
      }
    }
  });
});
