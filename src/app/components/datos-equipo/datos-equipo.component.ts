import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/model/partido';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/model/jugador';


@Component({
  selector: 'app-datos-equipo',
  templateUrl: './datos-equipo.component.html',
  styleUrls: ['./datos-equipo.component.scss']
})
export class DatosEquipoComponent implements OnInit {

  jugadoresLocal:number[] = new Array
  jugadoresVisitante:number[] = new Array
  partido: Partido
  idJugadorLocal: number = 0; 
  idJugadorVisitante: number = 0;
  nombreJugadorLocal: boolean = false
  apellidosJugadorLocal: boolean = false
  numeroJugadorLocal: boolean = false
  nombreJugadorVisitante: boolean = false
  apellidosJugadorVisitante: boolean = false
  numeroJugadorVisitante: boolean = false
  minimoJugadoresLocal :boolean = false
  minimoJugadoresVisitante: boolean = false
  jugadoresLocalPartido: Jugador[] = new Array
  jugadoresVisitantePartido: Jugador[] = new Array
  partidoEmpezado: boolean = false
  equipoLocal: string
  equipoVisitante: string
  todosDatosOk: boolean = false
  maximoJugadoresLocal: boolean = false
  maximoJugadoresVisitante: boolean = false

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.match.subscribe(partido => this.partido = partido)
    if(this.partido._cuarto != null) {
      (<HTMLInputElement>document.getElementById("nombreEquipoLocal")).disabled;
      (<HTMLInputElement>document.getElementById("nombreEquipoVisitante")).disabled;
      document.getElementById("boton").style.display = "none"
      this.partidoEmpezado = true
    }
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
    this.idJugadorLocal = this.jugadoresLocal.length
    this.idJugadorVisitante = this.jugadoresVisitante.length
    if(this.jugadoresLocal.length >= 5) {
      this.minimoJugadoresLocal = true
    }
    if(this.jugadoresVisitante.length >= 5) {
      this.minimoJugadoresVisitante = true
    }
    if(this.jugadoresLocal.length >= 12) {
      this.maximoJugadoresLocal = true
    }
    if(this.jugadoresVisitante.length >= 12) {
      this.maximoJugadoresVisitante = true
    }
    this.equipoLocal = this.partido._equipoLocal
    this.equipoVisitante = this.partido._equipoVisitante
    if(this.partido._jugadoresLocal.length >= 5 && this.partido._jugadoresVisitante.length >= 5
      && this.partido._equipoLocal != "" && this.partido._equipoVisitante != "") {
        this.todosDatosOk = true
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

  deleteNameLocalPlayer(id: string) {
    document.getElementById("nombreJugadorLocal"+id).innerHTML = "";
    (<HTMLInputElement>document.getElementById("nombreJugadorLocal"+id)).contentEditable = "true";
  }

  deleteSurnameLocalPlayer(id: string) {
    document.getElementById("apellidosJugadorLocal"+id).innerHTML = "";
    (<HTMLInputElement>document.getElementById("apellidosJugadorLocal"+id)).contentEditable = "true";
  }

  deleteNumberLocalPlayer(id: string) {
    document.getElementById("numeroJugadorLocal"+id).innerHTML = "";
    (<HTMLInputElement>document.getElementById("numeroJugadorLocal"+id)).contentEditable = "true";
  }

  deleteNameAwayPlayer(id: string) {
    document.getElementById("nombreJugadorVisitante"+id).innerHTML = "";
    (<HTMLInputElement>document.getElementById("nombreJugadorVisitante"+id)).contentEditable = "true";
  }

  deleteSurnameAwayPlayer(id: string) {
    document.getElementById("apellidosJugadorVisitante"+id).innerHTML = "";
    (<HTMLInputElement>document.getElementById("apellidosJugadorVisitante"+id)).contentEditable = "true";
  }

  deleteNumberAwayPlayer(id: string) {
    document.getElementById("numeroJugadorVisitante"+id).innerHTML = "";
    (<HTMLInputElement>document.getElementById("numeroJugadorVisitante"+id)).contentEditable = "true";
  }

  addLocalPlayer(id: string) {
    let estaJugando: boolean = true;
    if(this.partido._jugadoresLocal.length >= 5) {
      estaJugando = false;
    }
    let player: Jugador = new Jugador(this.idJugadorLocal, document.getElementById("nombreJugadorLocal"+id).innerText, 
                                      document.getElementById("apellidosJugadorLocal"+id).innerText,
                                      document.getElementById("numeroJugadorLocal"+id).innerText, 0, 0,
                                      0, 0, 0, 0, 0, 0, 0, estaJugando)
    this.partido._jugadoresLocal.push(player)
    this.jugadoresLocalPartido.push(player)

    document.getElementById("nombreJugadorLocal"+id).innerHTML = "Nombre";
    document.getElementById("apellidosJugadorLocal"+id).innerHTML = "Apellidos";
    document.getElementById("numeroJugadorLocal"+id).innerHTML = "Número";
    this.jugadoresLocal.push(this.idJugadorLocal)
    this.idJugadorLocal++
    this.nombreJugadorLocal=false
    if(this.idJugadorLocal >= 5) {
      this.minimoJugadoresLocal = true
    }
    if(this.idJugadorLocal >= 12) {
      this.maximoJugadoresLocal = true
    }
    if(this.partido._jugadoresLocal.length >= 5 && this.partido._jugadoresVisitante.length >= 5
      && this.partido._equipoLocal != "" && this.partido._equipoVisitante != "") {
        this.todosDatosOk = true
      }
  }

  addAwayPlayer(id: string) {
    let estaJugando: boolean = true;
    if(this.partido._jugadoresVisitante.length >= 5) {
      estaJugando = false;
    }
    let player: Jugador = new Jugador(this.idJugadorVisitante, document.getElementById("nombreJugadorVisitante"+id).innerText, 
                                      document.getElementById("apellidosJugadorVisitante"+id).innerText,
                                      document.getElementById("numeroJugadorVisitante"+id).innerText, 0, 0,
                                      0, 0, 0, 0, 0, 0, 0, estaJugando)
    this.partido._jugadoresVisitante.push(player)
    this.jugadoresVisitantePartido.push(player)

    document.getElementById("nombreJugadorVisitante"+id).innerHTML = "Nombre";
    document.getElementById("apellidosJugadorVisitante"+id).innerHTML = "Apellidos";
    document.getElementById("numeroJugadorVisitante"+id).innerHTML = "Número";
    this.jugadoresVisitante.push(this.idJugadorVisitante)
    this.idJugadorVisitante++
    this.nombreJugadorVisitante=false
    if(this.idJugadorVisitante >= 5) {
      this.minimoJugadoresVisitante = true
    }
    if(this.idJugadorVisitante >= 12) {
      this.maximoJugadoresVisitante = true
    }
    if(this.partido._jugadoresLocal.length >= 5 && this.partido._jugadoresVisitante.length >= 5
      && this.partido._equipoLocal != "" && this.partido._equipoVisitante != "") {
        this.todosDatosOk = true
      }
  }

  checkJugadorLocal(id: string) {
    if(this.partido._cuarto == null) {
      if(document.getElementById("nombreJugadorLocal"+id).innerText !== "Nombre" && document.getElementById("nombreJugadorLocal"+id).innerText !== "") {
        this.nombreJugadorLocal = true
      }
      else {
        this.nombreJugadorLocal = false
      }
      if(document.getElementById("apellidosJugadorLocal"+id).innerText !== "Apellidos" && document.getElementById("apellidosJugadorLocal"+id).innerText !== "") {
        this.apellidosJugadorLocal = true
      }
      else {
        this.apellidosJugadorLocal = false
      }
      if(document.getElementById("numeroJugadorLocal"+id).innerText !== "Número" && document.getElementById("numeroJugadorLocal"+id).innerText !== "") {
        this.numeroJugadorLocal = true
      }
      else {
        this.numeroJugadorLocal = false
      }
    }
  }

  checkJugadorVisitante(id: string) {
    if(this.partido._cuarto == null) {
      if(document.getElementById("nombreJugadorVisitante"+id).innerText !== "Nombre" && document.getElementById("nombreJugadorVisitante"+id).innerText !== "") {
        this.nombreJugadorVisitante = true
      }
      else {
        this.nombreJugadorVisitante = false
      }
      if(document.getElementById("apellidosJugadorVisitante"+id).innerText !== "Apellidos" && document.getElementById("apellidosJugadorVisitante"+id).innerText !== "") {
        this.apellidosJugadorVisitante = true
      }
      else {
        this.apellidosJugadorVisitante = false
      }
      if(document.getElementById("numeroJugadorVisitante"+id).innerText !== "Número" && document.getElementById("numeroJugadorVisitante"+id).innerText !== "") {
        this.numeroJugadorVisitante = true
      }
      else {
        this.numeroJugadorVisitante = false
      }
    }
  }

  fillNameLocalTeam() {
    if((<HTMLInputElement>document.getElementById("nombreEquipoLocal")).value != "") {
      this.partido._equipoLocal = (<HTMLInputElement>document.getElementById("nombreEquipoLocal")).value
    }
    if(this.partido._jugadoresLocal.length >= 5 && this.partido._jugadoresVisitante.length >= 5
      && this.partido._equipoLocal != "" && this.partido._equipoVisitante != "") {
        this.todosDatosOk = true
      }
  }

  fillNameAwayTeam() {
    if((<HTMLInputElement>document.getElementById("nombreEquipoVisitante")).value != "") {
      this.partido._equipoVisitante = (<HTMLInputElement>document.getElementById("nombreEquipoVisitante")).value
    }
    if(this.partido._jugadoresLocal.length >= 5 && this.partido._jugadoresVisitante.length >= 5
      && this.partido._equipoLocal != "" && this.partido._equipoVisitante != "") {
        this.todosDatosOk = true
      }
  }
}
