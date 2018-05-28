import {QlsVisitor} from './qls-visitor';
import {Stylesheet} from '../stylesheet';
import {Page} from '../page';
import {Section} from '../section';
import {QlsQuestion} from '../qls-question';
import {QlQuestion} from '../../ql';
import {DuplicateIdentifierError, MissingIdentifierError} from '../../../errors';
import * as _ from 'lodash';

export class CheckIdentifiersVisitor implements QlsVisitor<void> {
  private qlsQuestions: QlsQuestion[] = [];

  static visit(qlQuestions: ReadonlyArray<QlQuestion>, stylesheet: Stylesheet): void {
    const visitor = new CheckIdentifiersVisitor(qlQuestions);
    visitor.visitStylesheet(stylesheet);
  }

  constructor(readonly qlQuestions: ReadonlyArray<QlQuestion>) { }

  visitStylesheet(stylesheet: Stylesheet): void {
    for (const page of stylesheet.pages) {
      page.accept(this);
    }

    const differenceQlQls = _.differenceWith(this.qlQuestions, this.qlsQuestions,
      (qlQuestion, qlsQuestion) =>  qlQuestion.name === qlsQuestion.name);

    if (differenceQlQls.length > 0) {
      const missingIdentifiers = differenceQlQls.map(q => q.name).join(', ');

      throw new MissingIdentifierError(`Identifier(s) ${missingIdentifiers} missing in styling definition`);
    }
  }

  visitPage(page: Page): void {
    for (const section of page.sections) {
      section.accept(this);
    }

    this.checkDuplicates();
  }

  visitSection(section: Section): void {
    for (const question of section.questions) {
      question.accept(this);
    }

    for (const subsection of section.subSections) {
      subsection.accept(this);
    }

    this.checkDuplicates();
  }

  visitQlsQuestion(qlsQuestion: QlsQuestion): void {
    const qlQuestion: QlQuestion = _.find(this.qlQuestions, {name: qlsQuestion.name});

    if (!qlQuestion) {
      throw new MissingIdentifierError(`Question with name ${qlsQuestion.name} not found`);
    }

    this.qlsQuestions.push(qlsQuestion);
  }

  private checkDuplicates(): void {
    if (_.uniqBy(this.qlsQuestions, 'name').length < this.qlsQuestions.length) {
      const groupedQuestions = _.groupBy(this.qlsQuestions, 'name');

      _.forEach(groupedQuestions, (value: QlsQuestion[], key: string) => {
        if (value.length > 1) {
          throw new DuplicateIdentifierError(`Duplicate question with identifier ${key}`);
        }
      });
    }
  }
}
