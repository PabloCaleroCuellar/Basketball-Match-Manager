import { Component, OnInit } from '@angular/core';
import { Partido } from 'src/app/model/partido';
import { DataService } from '../../service/data.service';

let interval;
let partidoAcabado: boolean = false;
let isTimerOn: boolean = false;
let isTimeOut: boolean = false;
let partidoEmpezado: boolean = false;

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
    let botonTimer = document.getElementById("timer");
    if(this.partido._cuarto != null) {
      partidoEmpezado = true
    }
    if(!partidoEmpezado) {
      let botones = document.getElementsByTagName("button")
      for (let i = 0; i < botones.length; i++) {
        (<HTMLInputElement> botones[i]).disabled = true;
      }
      botonTimer.setAttribute("class", "btn btn-warning")
      if (botonTimer.innerHTML == "Reanudar partido") {
        botonTimer.innerHTML = "Rellene los datos para empezar el partido";
      }
    }
    if(isTimeOut) {
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
    }
    if(this.partido._tiemposVisitante <= 0) {
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true
    }
    if(this.partido._tiemposLocal <= 0) {
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true
    }
    if(partidoAcabado) {
      let botones = document.getElementsByTagName("button")
        for (let i = 0; i < botones.length; i++) {
          (<HTMLInputElement> botones[i]).disabled = true;
        }
        botonTimer.setAttribute("class", "btn btn-warning")
        botonTimer.innerHTML = "Partido acabado";
    }
    else {
      if(isTimerOn){
        botonTimer.setAttribute("class", "btn btn-danger")
        botonTimer.innerHTML = "Parar tiempo";
      }
    }
  }

  basketLocal(value: number) {
    this.partido._puntosLocal += value
    for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
      this.partido._jugadoresLocal[i]._puntos += value;
    }
    this.añadirMinutosAJugadores()
  }

  basketVisitante(value: number) {
    this.partido._puntosVisitante += value
    for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
      this.partido._jugadoresVisitante[i]._puntos += value;
    }
    this.añadirMinutosAJugadores()
  }

  accionJugadorLocal(accion: string) {
    switch(accion) {
      case "falta":
        if(!isTimerOn) {
          this.partido._faltasLocal++;
        }
        else {
          this.partido._faltasLocal++;
          clearInterval(interval);
          isTimerOn = false;
          this.Interval()
        }
        for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
          this.partido._jugadoresLocal[i]._faltas++;
        }
        this.partido._faltasLocal++;
        this.añadirMinutosAJugadores()
        break;
      case "rebote":
        this.partido._rebotesLocal++;
        for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
          this.partido._jugadoresLocal[i]._rebotes++;
        }
        this.partido._rebotesLocal++;
        this.añadirMinutosAJugadores()
        break;
      case "asistencia":
        this.partido._asistenciasLocal++;
        for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
          this.partido._jugadoresLocal[i]._asistencias++;
        }
        this.partido._asistenciasLocal++;
        this.añadirMinutosAJugadores()
        break;
      case "robo":
        this.partido._robosLocal++;
        for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
          this.partido._jugadoresLocal[i]._robos++;
        }
        this.partido._robosLocal++;
        this.añadirMinutosAJugadores()
        break;
      case "tapon":
        this.partido._taponesLocal++;
        for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
          this.partido._jugadoresLocal[i]._tapones++;
        }
        this.partido._taponesLocal++;
        this.añadirMinutosAJugadores()
        break;
      case "perdida":
        this.partido._perdidasLocal++;
        for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
          this.partido._jugadoresLocal[i]._perdidas++;
        }
        this.partido._perdidasLocal++;
        this.añadirMinutosAJugadores()
        break;
      default: 
        alert("Esta acción no existe")
        break;
      }
    }

  accionJugadorVisitante(accion: string) {
    switch(accion) {
      case "falta":
        if(!isTimerOn) {
          this.partido._faltasVisitante++;
        }
        else {
          this.partido._faltasVisitante++;
          clearInterval(interval);
          isTimerOn = false;
          this.Interval()
        }
        for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
          this.partido._jugadoresVisitante[i]._faltas++;
        }
        this.partido._faltasVisitante++;
        this.añadirMinutosAJugadores()
        break;
      case "rebote":
        this.partido._rebotesVisitante++;
        for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
          this.partido._jugadoresVisitante[i]._rebotes++;
        }
        this.partido._rebotesVisitante++;
        this.añadirMinutosAJugadores()
        break;
      case "asistencia":
        this.partido._asistenciasVisitante++;
        for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
          this.partido._jugadoresVisitante[i]._asistencias++;
        }
        this.partido._asistenciasVisitante++;
        this.añadirMinutosAJugadores()
        break;
      case "robo":
        this.partido._robosVisitante++;
        for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
          this.partido._jugadoresVisitante[i]._robos++;
        }
        this.partido._robosVisitante++;
        this.añadirMinutosAJugadores()
        break;
      case "tapon":
        this.partido._taponesVisitante++;
        for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
          this.partido._jugadoresVisitante[i]._tapones++;
        }
        this.partido._taponesVisitante++;
        this.añadirMinutosAJugadores()
        break;
      case "perdida":
        this.partido._perdidasVisitante++;
        for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
          this.partido._jugadoresVisitante[i]._perdidas++;
        }
        this.partido._perdidasVisitante++;
        this.añadirMinutosAJugadores()
        break;
      default: 
        alert("Esta acción no existe")
        break;
      }
    }

  tiempoMuertoLocal() {
    if(!isTimerOn) {
      this.partido._tiemposLocal--;
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
    }
    else {
      this.partido._tiemposLocal--;
      clearInterval(interval);
      isTimerOn = false;
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
      this.Interval()
    }
    isTimeOut = true;
    if(this.partido._tiemposLocal <= 0) {
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true
    }
    this.añadirMinutosAJugadores()
  }

  tiempoMuertoVisitante() {
    if(!isTimerOn) {
      this.partido._tiemposVisitante--;
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
    }
    else{
      this.partido._tiemposVisitante--;
      clearInterval(interval);
      isTimerOn = false;
      (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
      this.Interval()
    }
    isTimeOut = true;
    if(this.partido._tiemposVisitante <= 0) {
      (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true
    }
    this.añadirMinutosAJugadores()
  }

  Interval() {
    let botonTimer = document.getElementById("timer");
    if (botonTimer.innerHTML == "Reanudar partido") {
      botonTimer.setAttribute("class", "btn btn-danger")
      botonTimer.innerHTML = "Parar tiempo";
    } 
    else {
      botonTimer.setAttribute("class", "btn btn-success")
      botonTimer.innerHTML = "Reanudar partido";
    }
  
    if (!interval) {
      if(isTimeOut) {
        isTimeOut = false;
      }
      isTimerOn = true
      interval = setInterval(()=> {
        if(this.partido._tiemposLocal > 0 && document.getElementById("tiempoMuertoLocal")) {
          (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = false;
        }
        if(this.partido._tiemposVisitante && document.getElementById("tiempoMuertoVisitante")) {
          (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = false;
        }
        this.partido._segundos--;
        if(this.partido._segundos < 0) {
          this.partido._minutos--;
          this.partido._segundos = 59;
        }
        if(this.partido._segundos === 0 && this.partido._minutos === 0) {
          if(this.partido._cuarto === 4) {
            let botones = document.getElementsByTagName("button")
            for (let i = 0; i < botones.length; i++) {
              (<HTMLInputElement> botones[i]).disabled = true;
            }
            partidoAcabado = true
            this.partido._cuarto = 4
            this.partido._minutos = 88;
            this.partido._segundos = 88;
            botonTimer.setAttribute("class", "btn btn-warning")
            botonTimer.innerHTML = "Partido acabado";
            clearInterval(interval);
          }
          else {
            isTimerOn = false
            this.partido._cuarto++;
            clearInterval(interval);
            if (botonTimer.innerHTML == "Reanudar partido") {
              botonTimer.setAttribute("class", "btn btn-danger")
              botonTimer.innerHTML = "Parar tiempo";
            } 
            else {
              botonTimer.setAttribute("class", "btn btn-success")
              botonTimer.innerHTML = "Reanudar partido";
            }
            interval = null;
            this.partido._minutos = 10;
            this.partido._segundos = 0;
          }
          this.partido._faltasLocal = 0;
          this.partido._faltasVisitante = 0;
          (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
          (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
        }
      }, 1000);
    } 
    else {
      isTimerOn = false
      clearInterval(interval);
      interval = null;
    }
  }

  añadirMinutosAJugadores() {
    for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
      this.partido._jugadoresLocal[i]._segundos = ((this.partido._cuarto * 60 * 10) - (this.partido._minutos*60 + this.partido._segundos))
      if(this.partido._jugadoresLocal[i]._segundos > 59) {
        let auxSegundosMinutos = Math.floor(this.partido._jugadoresLocal[i]._segundos / 60);
        this.partido._jugadoresLocal[i]._minutos = auxSegundosMinutos;
        this.partido._jugadoresLocal[i]._segundos = this.partido._jugadoresLocal[i]._segundos - auxSegundosMinutos*60;
      }
    }
    for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
      this.partido._jugadoresVisitante[i]._segundos = ((this.partido._cuarto * 60 * 10) - (this.partido._minutos*60 + this.partido._segundos))
      if(this.partido._jugadoresVisitante[i]._segundos > 59) {
        let auxSegundosMinutos = Math.floor(this.partido._jugadoresVisitante[i]._segundos / 60);
        this.partido._jugadoresVisitante[i]._minutos = auxSegundosMinutos;
        this.partido._jugadoresVisitante[i]._segundos = this.partido._jugadoresVisitante[i]._segundos - auxSegundosMinutos*60;
      }
    }
  }
}
