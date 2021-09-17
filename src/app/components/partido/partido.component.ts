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
  jugadoresLocal: number[] = new Array;
  jugadoresVisitante: number[] = new Array;
  hacerCambio: boolean = false;

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
    for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
      this.jugadoresLocal.push(i);
    }
    for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
      this.jugadoresVisitante.push(i);
    }
  }

  accionJugadorLocal(accion: string, idJugador: number, puntos: number) {
    switch(accion) {
      case "canasta":
        this.partido._puntosLocal += puntos
        this.partido._jugadoresLocal[idJugador]._puntos += puntos;
        this.añadirMinutosAJugadores()
        break;
      case "falta":
        this.partido._faltasLocal++;
        if(!isTimerOn) {
        }
        else {
          clearInterval(interval);
          isTimerOn = false;
          this.Interval()
        }
        this.partido._jugadoresLocal[idJugador]._faltas++;
        this.añadirMinutosAJugadores()
        break;
      case "rebote":
        this.partido._rebotesLocal++;
        this.partido._jugadoresLocal[idJugador]._rebotes++;
        this.añadirMinutosAJugadores()
        break;
      case "asistencia":
        this.partido._asistenciasLocal++;
        this.partido._jugadoresLocal[idJugador]._asistencias++;
        this.añadirMinutosAJugadores()
        break;
      case "robo":
        this.partido._robosLocal++;
        this.partido._jugadoresLocal[idJugador]._robos++;
        this.añadirMinutosAJugadores()
        break;
      case "tapon":
        this.partido._taponesLocal++;
        this.partido._jugadoresLocal[idJugador]._tapones++;
        this.añadirMinutosAJugadores()
        break;
      case "perdida":
        this.partido._perdidasLocal++;
        this.partido._jugadoresLocal[idJugador]._perdidas++;
        this.añadirMinutosAJugadores()
        break;
      default: 
        alert("Esta acción no existe")
        break;
      }
    }

  accionJugadorVisitante(accion: string, idJugador: number, puntos: number) {
    switch(accion) {
      case "canasta":
        this.partido._puntosVisitante += puntos
        this.partido._jugadoresVisitante[idJugador]._puntos += puntos;
        this.añadirMinutosAJugadores()
        break;
      case "falta":
        this.partido._faltasVisitante++;
        if(!isTimerOn) {
        }
        else {
          clearInterval(interval);
          isTimerOn = false;
          this.Interval()
        }
        this.partido._jugadoresVisitante[idJugador]._faltas++;
        this.añadirMinutosAJugadores()
        break;
      case "rebote":
        this.partido._rebotesVisitante++;
        this.partido._jugadoresVisitante[idJugador]._rebotes++;
        this.añadirMinutosAJugadores()
        break;
      case "asistencia":
        this.partido._asistenciasVisitante++;
        this.partido._jugadoresVisitante[idJugador]._asistencias++;
        this.añadirMinutosAJugadores()
        break;
      case "robo":
        this.partido._robosVisitante++;
        this.partido._jugadoresVisitante[idJugador]._robos++;
        this.añadirMinutosAJugadores()
        break;
      case "tapon":
        this.partido._taponesVisitante++;
        this.partido._jugadoresVisitante[idJugador]._tapones++;
        this.añadirMinutosAJugadores()
        break;
      case "perdida":
        this.partido._perdidasVisitante++;
        this.partido._jugadoresVisitante[idJugador]._perdidas++;
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
            this.añadirMinutosAJugadores()
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
            this.añadirMinutosAJugadores()
            this.partido._minutos = 10;
            this.partido._segundos = 0;
            this.añadirMinutosAJugadores()
          }
          this.partido._faltasLocal = 0;
          this.partido._faltasVisitante = 0;
          (<HTMLInputElement> document.getElementById("tiempoMuertoLocal")).disabled = true;
          (<HTMLInputElement> document.getElementById("tiempoMuertoVisitante")).disabled = true;
        }
      }, 100);
    } 
    else {
      isTimerOn = false
      clearInterval(interval);
      interval = null;
      this.añadirMinutosAJugadores()
    }
  }

  añadirMinutosAJugadores() {
    if(this.partido._minutos === 10) {
      this.partido._minutoUltimaAccion = 9;
      this.partido._segundoUltimaAccion = 60;
    }
    else {
      for(let i = 0; i < this.partido._jugadoresLocal.length; i++) {
        if(this.partido._jugadoresLocal[i]._estaJugando) {
          this.partido._jugadoresLocal[i]._segundos += ((this.partido._minutoUltimaAccion - this.partido._minutos) * 60) + (this.partido._segundoUltimaAccion - this.partido._segundos);
          if(this.partido._jugadoresLocal[i]._segundos > 59) {
            let auxSegundosMinutos = Math.floor(this.partido._jugadoresLocal[i]._segundos / 60);
            this.partido._jugadoresLocal[i]._minutos += auxSegundosMinutos
            this.partido._jugadoresLocal[i]._segundos -= (auxSegundosMinutos*60);
          }
        } 
      }
      for(let i = 0; i < this.partido._jugadoresVisitante.length; i++) {
        if(this.partido._jugadoresVisitante[i]._estaJugando) {
          this.partido._jugadoresVisitante[i]._segundos += ((this.partido._minutoUltimaAccion - this.partido._minutos) * 60) + (this.partido._segundoUltimaAccion - this.partido._segundos);
          if(this.partido._jugadoresVisitante[i]._segundos > 59) {
            let auxSegundosMinutos = Math.floor(this.partido._jugadoresVisitante[i]._segundos / 60);
            this.partido._jugadoresVisitante[i]._minutos += auxSegundosMinutos
            this.partido._jugadoresVisitante[i]._segundos -= (auxSegundosMinutos*60);
          }
        }
      }   
      this.partido._minutoUltimaAccion = this.partido._minutos;
      this.partido._segundoUltimaAccion = this.partido._segundos;
    }
  }

  popupCambio() {
    /*if(this.partido._jugadoresVisitante[0]._estaJugando) {
      this.partido._jugadoresVisitante[0]._estaJugando = false;
      this.partido._jugadoresVisitante[5]._estaJugando = true;
    }
    else {
      this.partido._jugadoresVisitante[0]._estaJugando = true;
      this.partido._jugadoresVisitante[5]._estaJugando = false;
    }*/
    this.hacerCambio = !this.hacerCambio
    if(this.hacerCambio) {
      document.getElementById("partido-local").style.backgroundColor = "black"
      document.getElementById("partido-local").style.opacity = "0.5";
      document.getElementById("partido-visitante").style.backgroundColor = "black"
      document.getElementById("partido-visitante").style.opacity = "0.5";
      document.getElementById("popupCambio").style.opacity = "1"
    }
    else {
      document.getElementById("partido-local").style.backgroundColor = "transparent"
      document.getElementById("partido-local").style.opacity = "1";
      document.getElementById("partido-visitante").style.backgroundColor = "transparent"
      document.getElementById("partido-visitante").style.opacity = "1";
    }
  }

  aniadirColaCambiosLocal(idJugador: number) {
    if(this.partido._jugadoresLocal[idJugador]._estaJugando) {
      this.partido._cambiosSalenPistaLocal.push(this.partido._jugadoresLocal[idJugador])
    }
    else {
      this.partido._cambiosEntranPistaLocal.push(this.partido._jugadoresLocal[idJugador])
    }
  }

  aniadirColaCambiosVisitante(idJugador: number) {
    if(this.partido._jugadoresVisitante[idJugador]._estaJugando) {
      this.partido._cambiosSalenPistaVisitante.push(this.partido._jugadoresVisitante[idJugador])
    }
    else {
      this.partido._cambiosEntranPistaVisitante.push(this.partido._jugadoresVisitante[idJugador])
    }
  }

  realizarCambios() {
    for(let i = 0; i < this.partido._cambiosSalenPistaVisitante.length; i++) {
      for(let x = 0; x < this.partido._jugadoresVisitante.length; x++) {
        if(this.partido._cambiosSalenPistaVisitante[i]._nombre === this.partido._jugadoresVisitante[x]._nombre &&
        this.partido._cambiosSalenPistaVisitante[i]._apellidos === this.partido._jugadoresVisitante[x]._apellidos &&
        this.partido._cambiosSalenPistaVisitante[i]._numero === this.partido._jugadoresVisitante[x]._numero) {
          this.partido._jugadoresVisitante[x]._estaJugando = false;
          this.partido._cambiosSalenPistaVisitante[i]._estaJugando = false;
          break;
        }
        else{
          continue;
        }
      }
    }
    for(let i = 0; i < this.partido._cambiosSalenPistaLocal.length; i++) {
      for(let x = 0; x < this.partido._jugadoresLocal.length; x++) {
        if(this.partido._cambiosSalenPistaLocal[i]._nombre === this.partido._jugadoresLocal[x]._nombre &&
        this.partido._cambiosSalenPistaLocal[i]._apellidos === this.partido._jugadoresLocal[x]._apellidos &&
        this.partido._cambiosSalenPistaLocal[i]._numero === this.partido._jugadoresLocal[x]._numero) {
          this.partido._jugadoresLocal[x]._estaJugando = false;
          this.partido._cambiosSalenPistaLocal[i]._estaJugando = false;
          break;
        }
        else{
          continue;
        }
      }
    }
    for(let i = 0; i < this.partido._cambiosEntranPistaVisitante.length; i++) {
      for(let x = 0; x < this.partido._jugadoresVisitante.length; x++) {
        if(this.partido._cambiosEntranPistaVisitante[i]._nombre === this.partido._jugadoresVisitante[x]._nombre &&
        this.partido._cambiosEntranPistaVisitante[i]._apellidos === this.partido._jugadoresVisitante[x]._apellidos &&
        this.partido._cambiosEntranPistaVisitante[i]._numero === this.partido._jugadoresVisitante[x]._numero) {
          this.partido._jugadoresVisitante[x]._estaJugando = true;
          this.partido._cambiosEntranPistaVisitante[i]._estaJugando = true;
          break;
        }
        else{
          continue;
        }
      }
    }
    for(let i = 0; i < this.partido._cambiosEntranPistaLocal.length; i++) {
      for(let x = 0; x < this.partido._jugadoresLocal.length; x++) {
        if(this.partido._cambiosEntranPistaLocal[i]._nombre === this.partido._jugadoresLocal[x]._nombre &&
        this.partido._cambiosEntranPistaLocal[i]._apellidos === this.partido._jugadoresLocal[x]._apellidos &&
        this.partido._cambiosEntranPistaLocal[i]._numero === this.partido._jugadoresLocal[x]._numero) {
          this.partido._jugadoresLocal[x]._estaJugando = true;
          this.partido._cambiosEntranPistaLocal[i]._estaJugando = true;
          break;
        }
        else{
          continue;
        }
      }
    }
    this.partido._cambiosSalenPistaLocal = new Array;
    this.partido._cambiosSalenPistaVisitante = new Array;
    this.partido._cambiosEntranPistaLocal = new Array;
    this.partido._cambiosEntranPistaVisitante = new Array;
    this.hacerCambio = !this.hacerCambio;
    document.getElementById("partido-local").style.backgroundColor = "transparent"
    document.getElementById("partido-visitante").style.backgroundColor = "transparent"
    document.getElementById("partido-visitante").style.opacity = "1";
    document.getElementById("partido-local").style.opacity = "1";
    console.log(this.partido._jugadoresVisitante)
    console.log(this.partido._jugadoresLocal)
  }
}
