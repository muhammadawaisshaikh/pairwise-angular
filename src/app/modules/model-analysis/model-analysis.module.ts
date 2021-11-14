import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelAnalysisRoutingModule } from './model-analysis-routing.module';
import { ModelAnalysisComponent } from './model-analysis.component';

@NgModule({
  declarations: [
    ModelAnalysisComponent
  ],
  imports: [
    CommonModule,
    ModelAnalysisRoutingModule
  ]
})
export class ModelAnalysisModule { }
