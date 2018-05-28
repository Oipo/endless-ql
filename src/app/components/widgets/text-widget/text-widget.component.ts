import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.css']
})
export class TextWidgetComponent {
  @Input() label: string;
  @Input() type: string;
  @Input() control: AbstractControl;
  @Input() styles;
}
