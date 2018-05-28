import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './services/question-control.service';
import { WidgetComponent } from './components/widget/widget.component';
import { MaterialModule } from './material.module';
import { StyledFormContentComponent } from './components/styled-form-content/styled-form-content.component';
import { ParseService } from './services/parse.service';


@NgModule({
  declarations: [
    AppComponent,
    DynamicFormQuestionComponent,
    WidgetComponent,
    StyledFormContentComponent
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
