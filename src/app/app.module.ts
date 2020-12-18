import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PartidoComponent } from './components/partido/partido.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { DatosEquipoComponent } from './components/datos-equipo/datos-equipo.component';
import { MarcadorComponent } from './components/marcador/marcador.component';
import { DataService } from './service/data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PartidoComponent,
    EstadisticasComponent,
    DatosEquipoComponent,
    MarcadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
