import { AppPage } from './app.po';
import * as mockInput from '../src/app/ql-mock-input';

describe('jectacular-ql App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.clearInputs();
  });

  it('should display welcome message', () => {
    expect(page.getParagraphText()).toEqual('Welcome to our spectacular QL parser!');
  });

  it('should parse an input to a form', done => {
    page.parseInput(mockInput.ifQuestionForm);
    page.formDisplayed().then(displayed => {
      expect(displayed).toBe(true);
    }).then(done, done.fail);
  });

  it('should show an error', done => {
    page.parseInput(mockInput.duplicateIdentifierForm);
    page.errorDisplayed().then(errorDisplayed => {
      expect(errorDisplayed).toBe(true);
      page.formDisplayed().then(formDisplayed => {
        expect(formDisplayed).toBe(false);
      });
    }).then(done, done.fail);
  });

  it('should parse prefilled form with styling', done => {
    page.prefill();
    page.parse();
    page.formDisplayed().then(displayed => {
      expect(displayed).toBe(true);
    }).then(done, done.fail);
  });
});
