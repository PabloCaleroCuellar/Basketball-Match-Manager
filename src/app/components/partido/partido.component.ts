import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/model/partido';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.scss']
})
export class PartidoComponent implements OnInit {

  partido: Partido

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.match.subscribe(partido => this.partido = partido)
  }

  basketLocal(value: number) {
    this.partido._puntosLocal += value
  }

  basketVisitante(value: number) {
    this.partido._puntosVisitante += value
  }

}
