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
  }

  basketVisitante(value: number) {
    this.partido._puntosVisitante += value
  }

  faltaLocal() {
    if(!isTimerOn) {
      this.partido._faltasLocal++;
    }
    else {
      this.partido._faltasLocal++;
      clearInterval(interval);
      isTimerOn = false;
      this.Interval()
    }
  }

  faltaVisitante() {
    if(!isTimerOn) {
      this.partido._faltasVisitante++;
    }
    else {
      this.partido._faltasVisitante++;
      clearInterval(interval);
      isTimerOn = false;
      this.Interval()
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
}
