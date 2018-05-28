import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Label} from '../../../domain/ast/qls';

@Component({
  selector: 'app-select-widget',
  templateUrl: './select-widget.component.html',
  styleUrls: ['./select-widget.component.css']
})
export class SelectWidgetComponent {
  @Input() questionLabel: string;
  @Input() optionLabels: Label[];
  @Input() control: AbstractControl;
  @Input() styles;
}
