export enum ExpressionType {
  NUMBER = 1,
  BOOLEAN = 2,
  STRING = 3,
  DATE = 4,
}

export class ExpressionTypeUtil {
  static toString(type: ExpressionType): string {
    return ExpressionType[type];
  }
}
