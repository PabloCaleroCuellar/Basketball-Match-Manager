export class Partido {
    _equipoLocal : string;
    _equipoVisitante : string;
    _cuarto : number;
    _minutos : number;
    _segundos : number
    _puntosLocal : number;
    _puntosVisitante : number;

    constructor(equipoLocal: string, equipoVisitante : string, cuarto : number, minutos : number, segundos: number, 
        puntosLocal : number, puntosVisitante : number) {
        this._equipoLocal = equipoLocal;
        this._equipoVisitante = equipoVisitante;
        this._cuarto = cuarto;
        this._minutos = minutos;
        this._segundos = segundos;
        this._puntosLocal = puntosLocal;
        this._puntosVisitante = puntosVisitante;
      }
}

