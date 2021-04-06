import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EleccionesPrimeraVueltaComponent } from './pages/elecciones-primera-vuelta/elecciones-primera-vuelta.component';
import { EleccionesSegundaVueltaComponent } from './pages/elecciones-segunda-vuelta/elecciones-segunda-vuelta.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'elecciones',
    pathMatch: 'full',
  },
  {
    path: 'elecciones',
    component: EleccionesPrimeraVueltaComponent,
  },
  {
    path: 'elecciones-segunda-vuelta',
    component: EleccionesSegundaVueltaComponent,
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
