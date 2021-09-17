import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Partido } from '../model/partido';

@Injectable()
export class DataService {

  private partido = new BehaviorSubject<Partido>(new Partido("", "", null, null, null, null, null, null, null, null, null, new Array, new Array, null, null, null, null, null, null, null, null, null, null, 9, 60, new Array, new Array, new Array, new Array))
  match = this.partido.asObservable();

  constructor() { }

  getMatch(partido: Partido){
    this.partido.next(partido);
  }
}
