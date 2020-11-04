import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBuilderComponent } from './app-builder.component';

const routes: Routes = [
  {
    path: '',
    component: AppBuilderComponent,
    children: [
      {
        path: '',
        redirectTo: 'applications',
        pathMatch: 'prefix'
      },
      {
          path: 'applications',
          loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBuilderRoutingModule { }
