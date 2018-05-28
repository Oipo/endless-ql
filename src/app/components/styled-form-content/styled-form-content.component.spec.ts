import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledFormContentComponent } from './styled-form-content.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {WidgetComponent} from '../widget/widget.component';
import {CheckboxWidgetComponent} from '../widgets/checkbox-widget/checkbox-widget.component';
import {RadioWidgetComponent} from '../widgets/radio-widget/radio-widget.component';
import {SpinboxWidgetComponent} from '../widgets/spinbox-widget/spinbox-widget.component';
import {SelectWidgetComponent} from '../widgets/select-widget/select-widget.component';
import {SliderWidgetComponent} from '../widgets/slider-widget/slider-widget.component';
import {TextWidgetComponent} from '../widgets/text-widget/text-widget.component';
import {StyledFormSectionComponent} from '../styled-form-section/styled-form-section.component';

describe('StyledFormContentComponent', () => {
  let component: StyledFormContentComponent;
  let fixture: ComponentFixture<StyledFormContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StyledFormContentComponent,
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
    fixture = TestBed.createComponent(StyledFormContentComponent);
    component = fixture.componentInstance;
    component.questions = [];
    component.styles = undefined;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
