import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'elecciones',
    pathMatch: 'full',
  },
  {
    path: 'elecciones',
    component: AppComponent,
  },
  {
    path: '**',
    redirectTo: '/elecciones'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
