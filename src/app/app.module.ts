import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './services/question-control.service';
import { WidgetComponent } from './components/widget/widget.component';
import { MaterialModule } from './material.module';
import { StyledFormContentComponent } from './components/styled-form-content/styled-form-content.component';
import { ParseService } from './services/parse.service';
import {CheckboxWidgetComponent} from './components/widgets/checkbox-widget/checkbox-widget.component';
import {RadioWidgetComponent} from './components/widgets/radio-widget/radio-widget.component';
import {SelectWidgetComponent} from './components/widgets/select-widget/select-widget.component';
import {SliderWidgetComponent} from './components/widgets/slider-widget/slider-widget.component';
import {SpinboxWidgetComponent} from './components/widgets/spinbox-widget/spinbox-widget.component';
import {TextWidgetComponent} from './components/widgets/text-widget/text-widget.component';
import {StyledFormSectionComponent} from './components/styled-form-section/styled-form-section.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicFormQuestionComponent,
    WidgetComponent,
    StyledFormContentComponent,
    StyledFormSectionComponent,
    CheckboxWidgetComponent,
    RadioWidgetComponent,
    SelectWidgetComponent,
    SliderWidgetComponent,
    SpinboxWidgetComponent,
    TextWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [QuestionControlService, ParseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
