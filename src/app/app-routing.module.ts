import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'model-analysis',
    loadChildren: () => import('./modules/model-analysis/model-analysis.module').then(m => m.ModelAnalysisModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
