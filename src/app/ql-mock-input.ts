// mock input for form

export const validQl =
  `form form {
    question1: "IntegerQuestion?"  integer
    question2: "IntegerQuestion?"  integer
    question3: "BooleanQuestion?"  boolean
    question4: "StringQuestion?"  string
    question5: "DateQuestion?"  date
    if (question3) {
      question6: "ifQuestion" integer
    }
  }`;

export const validFormWithIf =
  `
      form form {
        question1: "IntegerQuestion?"  integer
        question2: "BooleanQuestion?"  boolean
        question3: "StringQuestion?"  string
 	      question4: "DateQuestion?"  date
 	      if (question2) {
 	        question5: "ifQuestion" integer
 	      }
      }
  `;

export const formWrongName =
  `
    form form! {
      question: "Question?" boolean
    }
  `;


export const formWrongQuestionName =
  `
    form form {
      questionå: "Question?" boolean
    }
  `;

export const formMissingQuestionName =
  `
    form form {
      : "Question?" boolean
      question: "Question?" boolean
    }
  `;

export const duplicateIdentifierForm =
  `
    form form {
      question1: "IntegerQuestion?"  integer
      question2: "BooleanQuestion?"  boolean
      question3: "StringQuestion?"  string
      question3: "StringQuestion?"  string
      question4: "DateQuestion?"  date
      if (question2) {
        question5: "ifQuestion" integer
      }
  }
  `;

export const ifQuestionForm =
  `
    form form {
      question: "Question?" boolean
      if (question) {
        questionIf: "QuestionIf?" integer
      }
    }
  `;

export const simpleForm =
  `
    form form {
      question: "Question?" boolean
    }
  `;

export const multipleQuestionForm =
  `
    form form {
      questionOne: "Question1?" boolean
      questionTwo: "Question2?" string
      questionThree: "Question3?" date
    }
  `;

export const expressionQuestionForm =
  `
    form form {
      question: "Question?" integer
      exprQuestion: "Expression?" integer = (10 + 500)
    }
  `;

export const expressionVariableForm =
  `
    form form {
      question: "Question?" integer
      exprQuestion: "Expression?" integer = question * 5
    }
  `;

export const commentForm =
  `
  form form {
    // q
      question1: "IntegerQuestion?"  integer
    // w
      question2: "BooleanQuestion?"  boolean
      question3: "StringQuestion?"  string
      question4: "DateQuestion?"  date
      if (question5) {
    // a
        question6: "ifQuestion" integer
    // d
      }
    // f
    }
`;
