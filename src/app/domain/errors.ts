export class UnsupportedTypeError implements Error {
  name = 'UnsupportedType';
  constructor(readonly message: string) { }
}

export class UnknownQuestionError implements Error {
  name = 'UnknownQuestion';
  constructor(readonly message: string) {}
}

export class TypeError implements Error {
  name = 'TypeError';
  constructor(readonly message: string) {}
}

export class DuplicateIdentifierError implements Error {
  name = 'DuplicateIdentifier';
  constructor(readonly message: string) {}
}

export class MissingIdentifierError implements Error {
  name = 'MissingIdentifier';
  constructor(readonly message: string) {}
}

export class CircularDependencyError implements Error {
  name = 'CircularDependency';
  constructor(readonly message: string) {}
}

export class ImpossibleIfConditionError implements Error {
  name = 'ImpossibleIfCondition';
  constructor(readonly message: string) {}
}

export class UnsupportedEvaluationError implements Error {
  name = 'UnsupportedEvaluation';
  constructor(readonly message: string) {}
}
