import { Injectable } from '@angular/core';
import {Form} from '../domain/ast/ql';
import {Stylesheet} from '../domain/ast/qls';
import {parse} from '../../parser/ql-parser';
import {parse as parseQls} from '../../parser/qls-parser';
import {CheckStatementTypeVisitor} from '../domain/ast/ql/visitors/check-statement-type-visitor';
import {CollectQuestionsVisitor} from '../domain/ast/ql/visitors/collect-questions-visitor';
import {CheckTypesVisitor} from '../domain/ast/qls/visitors/check-types-visitor';
import {CheckIdentifiersVisitor} from '../domain/ast/qls/visitors/check-identifiers-visitor';

export class ParseResult {
  constructor(readonly formName: string, readonly form: Form, readonly styles: Stylesheet) { }
}

@Injectable()
export class ParseService {

  parse(qlInput: string, qlsInput: string): ParseResult {
    let astQls: Stylesheet;

    const astQl: Form = parse(qlInput, {});
    const allQuestions = CollectQuestionsVisitor.visit(astQl);

    // static type checking
    CheckStatementTypeVisitor.visit(allQuestions, astQl);

    // only parse qls if there is valid input
    if (qlsInput && qlsInput.trim().length > 0 ) {
      astQls = parseQls(qlsInput, {});

      CheckTypesVisitor.visit(allQuestions, astQls);
      CheckIdentifiersVisitor.visit(allQuestions, astQls);
    }
    return new ParseResult(astQl.name, astQl, astQls);
  }
}
