export interface StyleValue {
  getValueAsString(): string;
}

export class RgbValue implements StyleValue {
  constructor(readonly red: number, readonly green: number, readonly blue: number) { }
  getValueAsString(): string {
    return '#' + this.red.toString() + this.green.toString() + this.blue.toString();
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
