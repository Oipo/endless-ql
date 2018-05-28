import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-spinbox-widget',
  templateUrl: './spinbox-widget.component.html',
  styleUrls: ['./spinbox-widget.component.css']
})
export class SpinboxWidgetComponent {
  @Input() label: string;
  @Input() control: AbstractControl;
  @Input() styles;

  onNumberChange(event) {
    this.control.setValue(parseInt(event.target.value, 10));
  }
}
