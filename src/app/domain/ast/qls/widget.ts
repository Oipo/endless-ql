import {WidgetType} from './widget-type';

export class Widget {
  static Empty = new Widget(WidgetType.NONE);
  constructor(public type: WidgetType, public labels: string[] = []) { }
}
