import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule
  ],
})
export class MaterialModule { }
