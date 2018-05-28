import {WidgetType} from './widget-type';
import {Label} from './label';

export class Widget {
  static Empty = new Widget(WidgetType.NONE);
  constructor(public type: WidgetType, public labels: Label[] = []) { }
}
