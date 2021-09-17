import { Jugador } from "./jugador";

export class Partido {
    _equipoLocal: string;
    _equipoVisitante: string;
    _cuarto: number;
    _minutos: number;
    _segundos: number
    _puntosLocal: number;
    _puntosVisitante: number;
    _faltasLocal: number;
    _faltasVisitante: number;
    _tiemposLocal: number;
    _tiemposVisitante: number;
    _jugadoresLocal: Jugador[];
    _jugadoresVisitante: Jugador[];
    _rebotesLocal: number;
    _rebotesVisitante: number;
    _asistenciasLocal: number;
    _asistenciasVisitante: number;
    _robosLocal: number;
    _robosVisitante: number;
    _taponesLocal: number;
    _taponesVisitante: number;
    _perdidasLocal: number;
    _perdidasVisitante: number;
    _minutoUltimaAccion: number;
    _segundoUltimaAccion: number;
    _cambiosEntranPistaLocal: Jugador[];
    _cambiosEntranPistaVisitante: Jugador[];
    _cambiosSalenPistaLocal: Jugador[];
    _cambiosSalenPistaVisitante: Jugador[];

    constructor(equipoLocal: string, equipoVisitante: string, cuarto: number, minutos: number, segundos: number, 
        puntosLocal: number, puntosVisitante: number, faltasLocal: number, faltasVisitante: number, 
        tiemposLocal: number, tiemposVisitante: number, jugadoresLocal: Jugador[], jugadoresVisitante: Jugador[],
        rebotesLocal: number, asistenciasLocal: number, robosLocal: number, taponesLocal: number, perdidasLocal: number,
        rebotesVisitante: number, asistenciasVisitante: number, robosVisitante: number, taponesVisitante: number, 
        perdidasVisitante: number, minutoUltimaAccion: number, segundoUltimaAccion: number, 
        cambiosEntranPistaLocal: Jugador[], cambiosEntranPistaVisitante: Jugador[], cambiosSalenPistaLocal: Jugador[],
        cambiosSalenPistaVisitante: Jugador[]) {
        this._equipoLocal = equipoLocal;
        this._equipoVisitante = equipoVisitante;
        this._cuarto = cuarto;
        this._minutos = minutos;
        this._segundos = segundos;
        this._puntosLocal = puntosLocal;
        this._puntosVisitante = puntosVisitante;
        this._faltasLocal = faltasLocal;
        this._faltasVisitante = faltasVisitante;
        this._tiemposLocal = tiemposLocal;
        this._tiemposVisitante = tiemposVisitante;
        this._jugadoresLocal = jugadoresLocal
        this._jugadoresVisitante = jugadoresVisitante
        this._rebotesLocal = rebotesLocal
        this._asistenciasLocal = asistenciasLocal
        this._robosLocal = robosLocal
        this._taponesLocal = taponesLocal
        this._perdidasLocal = perdidasLocal
        this._rebotesVisitante = rebotesVisitante
        this._asistenciasVisitante = asistenciasVisitante
        this._robosVisitante = robosVisitante
        this._taponesVisitante = taponesVisitante
        this._perdidasVisitante = perdidasVisitante
        this._minutoUltimaAccion = minutoUltimaAccion;
        this._segundoUltimaAccion = segundoUltimaAccion;
        this._cambiosEntranPistaLocal = cambiosEntranPistaLocal;
        this._cambiosEntranPistaVisitante = cambiosEntranPistaVisitante;
        this._cambiosSalenPistaLocal = cambiosSalenPistaLocal;
        this._cambiosSalenPistaVisitante = cambiosSalenPistaVisitante;
      }
}

