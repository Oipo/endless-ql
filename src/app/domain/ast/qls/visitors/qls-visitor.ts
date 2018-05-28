import {QlsQuestion} from '../qls-question';
import {Stylesheet} from '../stylesheet';
import {Page} from '../page';
import {Section} from '../section';

export interface QlsVisitor<T> {
  visitStylesheet(stylesheet: Stylesheet): T;
  visitPage(page: Page): T;
  visitSection(section: Section): T;
  visitQlsQuestion(qlsQuestion: QlsQuestion): T;
}
