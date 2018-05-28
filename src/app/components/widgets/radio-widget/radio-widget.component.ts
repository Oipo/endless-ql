import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Label} from '../../../domain/ast/qls';

@Component({
  selector: 'app-radio-widget',
  templateUrl: './radio-widget.component.html',
  styleUrls: ['./radio-widget.component.css']
})
export class RadioWidgetComponent {
  @Input() questionLabel: string;
  @Input() optionLabels: Label[];
  @Input() control: AbstractControl;
  @Input() styles;
}
