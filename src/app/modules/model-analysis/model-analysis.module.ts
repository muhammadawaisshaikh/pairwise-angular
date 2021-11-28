import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { ModelAnalysisRoutingModule } from './model-analysis-routing.module';
import { ModelAnalysisComponent } from './model-analysis.component';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

@NgModule({
  declarations: [
    ModelAnalysisComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ModelAnalysisRoutingModule,
    FormsModule
  ]
})
export class ModelAnalysisModule { }
