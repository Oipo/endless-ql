import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledFormSectionComponent } from './styled-form-section.component';
import {SpinboxWidgetComponent} from '../widgets/spinbox-widget/spinbox-widget.component';
import {TextWidgetComponent} from '../widgets/text-widget/text-widget.component';
import {SliderWidgetComponent} from '../widgets/slider-widget/slider-widget.component';
import {WidgetComponent} from '../widget/widget.component';
import {CheckboxWidgetComponent} from '../widgets/checkbox-widget/checkbox-widget.component';
import {SelectWidgetComponent} from '../widgets/select-widget/select-widget.component';
import {RadioWidgetComponent} from '../widgets/radio-widget/radio-widget.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';

describe('StyledFormSectionComponent', () => {
  let component: StyledFormSectionComponent;
  let fixture: ComponentFixture<StyledFormSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StyledFormSectionComponent,
        WidgetComponent,
        CheckboxWidgetComponent,
        RadioWidgetComponent,
        SelectWidgetComponent,
        SliderWidgetComponent,
        SpinboxWidgetComponent,
        TextWidgetComponent
      ],
      imports: [MaterialModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyledFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
