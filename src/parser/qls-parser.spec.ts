import {parse} from './qls-parser';
import * as mockInput from '../app/qls-mock-input';
import {Widget, WidgetType} from '../app/domain/ast/qls';

describe('The QLS parser', () => {
  it ('should parse input without error', () => {
    const parsedInput = parse(mockInput.validQLS, {});
    expect(parsedInput.name).toBe('taxOfficeExample');
    expect(parsedInput.pages.length).toBe(2);
    expect(parsedInput.pages[0].sections.length).toBe(2);
    expect(parsedInput.pages[1].defaultSettings.widget).toEqual(new Widget(WidgetType.RADIO, ['Yes', 'No']));
  });

  it('should parse widgets correctly', () => {
    const parsedInput = parse(mockInput.widgetStyleSheet, {});
    const questions = parsedInput.pages[0].sections[0].questions;

    expect(questions.length).toBe(6);

    expect(questions[0].widget).toEqual(new Widget(WidgetType.RADIO, ['Yes', 'No']));
    expect(questions[1].widget).toEqual(new Widget(WidgetType.TEXT, []));
    expect(questions[2].widget).toEqual(new Widget(WidgetType.CHECKBOX, []));
    expect(questions[3].widget).toEqual(new Widget(WidgetType.SPINBOX, []));
    expect(questions[4].widget).toEqual(new Widget(WidgetType.DROPDOWN, ['Yes', 'No']));
    expect(questions[5].widget).toEqual(new Widget(WidgetType.SLIDER, []));
  });
});
