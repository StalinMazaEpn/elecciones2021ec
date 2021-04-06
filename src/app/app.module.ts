import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EleccionesPrimeraVueltaComponent } from './pages/elecciones-primera-vuelta/elecciones-primera-vuelta.component';
import { EleccionesSegundaVueltaComponent } from './pages/elecciones-segunda-vuelta/elecciones-segunda-vuelta.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    EleccionesPrimeraVueltaComponent,
    EleccionesSegundaVueltaComponent,
    NavbarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
