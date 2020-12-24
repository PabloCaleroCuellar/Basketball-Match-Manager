import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/model/partido';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datos-equipo',
  templateUrl: './datos-equipo.component.html',
  styleUrls: ['./datos-equipo.component.scss']
})
export class DatosEquipoComponent implements OnInit {

  partido: Partido

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.match.subscribe(partido => this.partido = partido)
    if(this.partido._cuarto != null) {
      (<HTMLInputElement>document.getElementById("nombreEquipoLocal")).disabled;
      (<HTMLInputElement>document.getElementById("nombreEquipoVisitante")).disabled;
    }
  }

  setMatch() {
    this.partido._equipoLocal = (<HTMLInputElement>document.getElementById("nombreEquipoLocal")).value;
    this.partido._equipoVisitante = (<HTMLInputElement>document.getElementById("nombreEquipoVisitante")).value;
    this.partido._cuarto = 1
    this.partido._puntosLocal = 0;
    this.partido._puntosVisitante = 0;
    this.partido._tiemposLocal = 6;
    this.partido._tiemposVisitante = 6;
    this.partido._minutos = 10;
    this.partido._segundos = 0;
    this.router.navigateByUrl('/partido');
  }

}
