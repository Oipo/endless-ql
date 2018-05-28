import {Location} from '../location';
import {StyleValue} from './style-value';

export class Style {
  constructor(readonly name: string, readonly value: StyleValue, readonly location: Location) { }
}
