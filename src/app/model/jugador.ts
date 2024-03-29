export class Jugador {
    _id: number;
    _nombre: string;
    _apellidos: string;
    _numero: string;
    _minutos: number;
    _puntos: number;
    _segundos: number;
    _rebotes: number;
    _asistencias: number;
    _robos: number;
    _tapones: number;
    _perdidas: number;
    _faltas: number;
    _estaJugando: boolean;

    constructor(id: number, nombre: string, apellidos: string, numero: string, minutos:number, segundos:number,
        rebotes: number, asistencias: number, robos: number, tapones: number, perdidas: number, 
        faltas: number, puntos: number, estaJugando: boolean) {
        this._id = id
        this._nombre = nombre
        this._apellidos = apellidos
        this._numero = numero
        this._minutos = minutos
        this._puntos = puntos
        this._segundos = segundos
        this._rebotes = rebotes;
        this._asistencias = asistencias;
        this._robos = robos;
        this._tapones = tapones;
        this._perdidas = perdidas;
        this._faltas = faltas;
        this._estaJugando = estaJugando;
    }
}
