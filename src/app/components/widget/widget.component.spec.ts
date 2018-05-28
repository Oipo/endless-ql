import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WidgetComponent} from './widget.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Widget, WidgetType} from '../../domain/ast/qls';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material.module';
import {CheckboxWidgetComponent} from '../widgets/checkbox-widget/checkbox-widget.component';
import {RadioWidgetComponent} from '../widgets/radio-widget/radio-widget.component';
import {SelectWidgetComponent} from '../widgets/select-widget/select-widget.component';
import {SliderWidgetComponent} from '../widgets/slider-widget/slider-widget.component';
import {SpinboxWidgetComponent} from '../widgets/spinbox-widget/spinbox-widget.component';
import {TextWidgetComponent} from '../widgets/text-widget/text-widget.component';
import {StyledQuestion} from '../../domain/angular-questions/styled-question';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  const question = new StyledQuestion<string>(
    'question',
    'textboxQuestion',
    undefined,
    'text',
    'string',
    () => true,
    new Widget(WidgetType.TEXT),
    {});

  const controls = {};
  controls['question'] = new FormControl({value: ''});
  const formGroup = new FormGroup(controls);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WidgetComponent,
        CheckboxWidgetComponent,
        RadioWidgetComponent,
        SelectWidgetComponent,
        SliderWidgetComponent,
        SpinboxWidgetComponent,
        TextWidgetComponent
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
  });

  it('should show a text input question', () => {
    component.question = question;
    component.form = formGroup;

    fixture.detectChanges();

    expect(component.control).toEqual(formGroup.controls[question.key]);
  });
});
