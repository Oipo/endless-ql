import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-checkbox-widget',
  templateUrl: './checkbox-widget.component.html',
  styleUrls: ['./checkbox-widget.component.css']
})
export class CheckboxWidgetComponent {
  @Input() label: string;
  @Input() styles;
  @Input() control: AbstractControl;
}
