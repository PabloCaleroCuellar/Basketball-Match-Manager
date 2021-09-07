export class Jugador {
    _nombre: string;
    _apellidos: string;
    _numero: string;
    _minutos: number;
    _segundos: number;

    constructor(nombre: string, apellidos: string, numero: string, minutos:number, segundos:number) {
        this._nombre = nombre
        this._apellidos = apellidos
        this._numero = numero
        this._minutos = minutos
        this._segundos = segundos
    }
}
