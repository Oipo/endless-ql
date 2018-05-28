import { Injectable } from '@angular/core';
import {Form} from '../domain/ast/ql';
import {Stylesheet} from '../domain/ast/qls';
import {parse} from '../../parser/ql-parser';
import {parse as parseQls} from '../../parser/qls-parser';

export class ParseResult {
  constructor(readonly formName: string, readonly form: Form, readonly styles: Stylesheet) { }
}

@Injectable()
export class ParseService {

  parse(qlInput: string, qlsInput: string): ParseResult {
    let astQls: Stylesheet;

    const astQl: Form = parse(qlInput, {});

    // static type checking
    astQl.checkForm();

    // only parse qls if there is valid input
    if (qlsInput && qlsInput.trim().length > 0 ) {
      astQls = parseQls(qlsInput, {});

      // static type checking on stylesheet
      astQls.checkStylesheet([], astQl.getAllQuestions());
    }
    return new ParseResult(astQl.name, astQl, astQls);
  }
}
