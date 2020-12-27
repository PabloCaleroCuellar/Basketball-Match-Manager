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

  titulares:number[] = [1,2,3,4,5]
  suplentes:number[] = [6,7,8,9,10,11,12]
  partido: Partido

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.match.subscribe(partido => this.partido = partido)
    if(this.partido._cuarto != null) {
      (<HTMLInputElement>document.getElementById("nombreEquipoLocal")).disabled;
      (<HTMLInputElement>document.getElementById("nombreEquipoVisitante")).disabled;
      document.getElementById("boton").style.display = "none"
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

  /*setPlayers(team: string) {
    if(team == "Local") {
      for(let all = 0; all < this.titulares.length; all++) {
        let id = "jugadorLocal" + (all+1).toString()
        document.getElementById(id).style.display = "none"
      }
      let selectLocal = parseInt((<HTMLInputElement> document.getElementById("selectLocal")).value);

      for(let x = 0; x < selectLocal; x++) {
        let id = "jugadorLocal" + (x+1).toString()
        let nombreJugador = "nombreJugadorLocal" + (x+1).toString()
        let apellidoJugador = "apellidosJugadorLocal" + (x+1).toString()
        let numeroJugador = "numeroJugadorLocal" + (x+1).toString()
        if(document.getElementById(id).style.display == ''){
          document.getElementById(id).style.display = "none"
        }
        document.getElementById(id).style.display = document.getElementById(id).style.display === 'none' ? '' : 'none';
        (<HTMLInputElement>document.getElementById(nombreJugador)).contentEditable = "true";
        (<HTMLInputElement>document.getElementById(apellidoJugador)).contentEditable = "true";
        (<HTMLInputElement>document.getElementById(numeroJugador)).contentEditable = "true";
      }
    }
    else {
      for(let all = 0; all < this.maximoJugadores.length; all++) {
        let id = "jugadorVisitante" + (all+1).toString()
        document.getElementById(id).style.display = "none"
      }
      let selectVisitante = parseInt((<HTMLInputElement> document.getElementById("selectVisitante")).value);

      //QUITAR ESTO CUANDO CONSIGA PODER PONER MAS DE 5 JUGADORES SIN QUE SE ROMPA EL MARCADOR
      if(selectVisitante > 5) {
        selectVisitante = 5
      }
      //HASTA AQUI
      
      for(let x = 0; x < selectVisitante; x++) {
        let id = "jugadorVisitante" + (x+1).toString()
        let nombreJugador = "nombreJugadorVisitante" + (x+1).toString()
        let apellidoJugador = "apellidosJugadorVisitante" + (x+1).toString()
        let numeroJugador = "numeroJugadorVisitante" + (x+1).toString()
        console.log(id + "tenia display: " +document.getElementById(id).style.display)
        if(document.getElementById(id).style.display == ''){
          document.getElementById(id).style.display = "none"
        }
        document.getElementById(id).style.display = document.getElementById(id).style.display === 'none' ? '' : 'none';
        (<HTMLInputElement>document.getElementById(nombreJugador)).contentEditable = "true";
        (<HTMLInputElement>document.getElementById(apellidoJugador)).contentEditable = "true";
        (<HTMLInputElement>document.getElementById(numeroJugador)).contentEditable = "true";
      }
    }
  }*/

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

}
