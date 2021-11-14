import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ModelAnalysisRoutingModule } from './model-analysis-routing.module';
import { ModelAnalysisComponent } from './model-analysis.component';

@NgModule({
  declarations: [
    ModelAnalysisComponent
  ],
  imports: [
    CommonModule,
    ModelAnalysisRoutingModule,
    FormsModule
  ]
})
export class ModelAnalysisModule { }
