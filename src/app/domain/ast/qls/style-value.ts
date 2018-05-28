export interface StyleValue {
  getValueAsString(): string;
}

export class HexValue implements StyleValue {
  constructor(readonly value: string) { }
  getValueAsString(): string {
    return this.value;
  }
}

export class NumberValue implements StyleValue {
  constructor(readonly value: number) { }

  getValueAsString(): string {
    return this.value.toString() + 'px';
  }
}

export class StringValue implements StyleValue {
  constructor(readonly value: string) { }

  getValueAsString(): string {
    return this.value;
  }
}
