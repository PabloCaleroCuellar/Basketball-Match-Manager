import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/model/partido';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/model/jugador';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  jugadoresLocal:number[] = new Array
  jugadoresVisitante:number[] = new Array
  partido: Partido

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.match.subscribe(partido => this.partido = partido)
    if(this.partido._jugadoresLocal.length > 0) {
      for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
        this.jugadoresLocal.push(i)
      }
    }
    if(this.partido._jugadoresVisitante.length > 0) {
      for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
        this.jugadoresVisitante.push(i)
      }
    }
  }

}
