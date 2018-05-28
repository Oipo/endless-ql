import {InputQuestion} from '../../domain/angular-questions/input-question';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DynamicFormQuestionComponent} from './dynamic-form-question.component';

describe('FormQuestionComponent', () => {
  let component: DynamicFormQuestionComponent;
  let fixture: ComponentFixture<DynamicFormQuestionComponent>;

  const question = new InputQuestion('question',
    'textboxquestion',
    undefined,
    'text', undefined);

  const controls = {};
  controls['question'] = new FormControl({value: ''});
  const formGroup = new FormGroup(controls);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormQuestionComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormQuestionComponent);
    component = fixture.componentInstance;
  });

  it('should show a text input question', () => {
    component.question = question;
    component.form = formGroup;

    fixture.detectChanges();

    expect(component.control).toEqual(formGroup.controls[question.key]);
  });
});
