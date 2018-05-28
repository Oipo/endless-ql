import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-slider-widget',
  templateUrl: './slider-widget.component.html',
  styleUrls: ['./slider-widget.component.css']
})
export class SliderWidgetComponent {
  @Input() label: string;
  @Input() control: AbstractControl;
  @Input() styles;

  onNumberChange(event) {
    this.control.setValue(event.value);
  }
}
