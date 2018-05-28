import {parse} from './qls-parser';
import * as mockInput from '../app/qls-mock-input';
import {Label, Widget, WidgetType} from '../app/domain/ast/qls';

const labels = [new Label('Yes', true), new Label('No', false)];
describe('The QLS parser', () => {
  it ('should parse input without error', () => {
    const parsedInput = parse(mockInput.validQLS, {});
    expect(parsedInput.name).toBe('taxOfficeExample');
    expect(parsedInput.pages.length).toBe(2);
    expect(parsedInput.pages[0].sections.length).toBe(2);
    expect(parsedInput.pages[1].defaultStyling.widget).toEqual(new Widget(WidgetType.RADIO, labels));
  });

  it('should parse widgets correctly', () => {
    const parsedInput = parse(mockInput.widgetStyleSheet, {});
    const questions = parsedInput.pages[0].sections[0].questions;

    expect(questions.length).toBe(6);

    expect(questions[0].widget).toEqual(new Widget(WidgetType.RADIO, labels));
    expect(questions[1].widget).toEqual(new Widget(WidgetType.TEXT, []));
    expect(questions[2].widget).toEqual(new Widget(WidgetType.CHECKBOX, []));
    expect(questions[3].widget).toEqual(new Widget(WidgetType.SPINBOX, []));
    expect(questions[4].widget).toEqual(new Widget(WidgetType.DROPDOWN, labels));
    expect(questions[5].widget).toEqual(new Widget(WidgetType.SLIDER, []));
  });
});
