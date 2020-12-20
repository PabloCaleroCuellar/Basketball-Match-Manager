import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Partido } from '../model/partido';

@Injectable()
export class DataService {

  private partido = new BehaviorSubject<Partido>(new Partido("equipo local", "equipo visitante", 2, 10, 0, 20, 16, 0, 0))
  match = this.partido.asObservable();

  constructor() { }

  getMatch(partido: Partido){
    this.partido.next(partido);
  }
}
