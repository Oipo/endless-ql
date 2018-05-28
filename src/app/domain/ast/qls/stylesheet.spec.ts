import {Stylesheet} from './stylesheet';
import {emptyLoc} from '../location';
import {QlsQuestion} from './qls-question';
import {Widget} from './widget';
import {WidgetType} from './widget-type';
import {Section} from './section';
import {Page} from './page';
import {QlQuestion} from '../ql';
import {BooleanQuestionType, IntQuestionType} from '../question-type';

describe('QLS Stylesheet', () => {
  it('Stylesheet which doesn\'t include all QL questions should throw', () => {
    const question = new QlsQuestion('name', new Widget(WidgetType.NONE, []), emptyLoc, null);
    const section = new Section('section', [], [question], emptyLoc, null);
    const page = new Page('page', [section], emptyLoc, null);
    const stylesheet = new Stylesheet('stylesheet', [page], emptyLoc);

    const qlIntQuestion = new QlQuestion('name', 'label', new IntQuestionType(), emptyLoc);
    const qlBoolQuestion = new QlQuestion('missingname', 'label', new BooleanQuestionType(), emptyLoc);

    expect(() => stylesheet.checkStylesheet([], [qlIntQuestion, qlBoolQuestion])).toThrow();
  });
});
