import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartidoComponent } from './components/partido/partido.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { DatosEquipoComponent } from './components/datos-equipo/datos-equipo.component';

const routes: Routes = [
  { path: 'datos', component: DatosEquipoComponent },
  { path: 'partido', component: PartidoComponent },
  { path: 'estadisticas', component: EstadisticasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
