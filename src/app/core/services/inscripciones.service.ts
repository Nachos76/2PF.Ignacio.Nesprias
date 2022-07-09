import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';

import { INSCRIPCIONES } from '../../data/mock-inscripciones';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  listaInscripciones: Inscripcion[] = INSCRIPCIONES;
  inscripcionSeleccionado$ = new BehaviorSubject<Inscripcion | null>(null);
  inscripciones$ = new BehaviorSubject<Inscripcion[]>(this.listaInscripciones);

  inscripcionLogueado:Inscripcion = this.listaInscripciones[1]//Mock a manejar con el servicio de login

  constructor() {}

  agregarInscripcion(inscripcion: Inscripcion) {
    this.listaInscripciones.push(inscripcion);
    this.inscripciones$.next(this.listaInscripciones);
  }

  obtenerInscripcions() {
    return this.inscripciones$.asObservable();
  }

  obtenerInscripcionSeleccionado() {
    return this.inscripcionSeleccionado$.asObservable();
  }

  seleccionarInscripcionxIndice(index?: number) {
    this.inscripcionSeleccionado$.next(
      index !== undefined ? this.listaInscripciones[index] : null
    );
  }

  seleccionarInscripcionLogueado() {
    let itemIndex = this.listaInscripciones.findIndex(item => item.id == this.inscripcionLogueado.id);
    this.inscripcionSeleccionado$.next(
      itemIndex !== undefined ? this.listaInscripciones[itemIndex] : null
    );
  }

  borrarInscripcionporIndice(index?: number) {
    this.listaInscripciones = this.listaInscripciones.filter((_, i) => index != i);
    this.inscripciones$.next(this.listaInscripciones);
  }

  editarInscripcion(inscripcion: Inscripcion) {
    let itemIndex = this.listaInscripciones.findIndex(item => item.id == inscripcion.id);
    this.listaInscripciones[itemIndex]=inscripcion;
    this.inscripciones$.next(this.listaInscripciones);
  }

  // buscarinscripcionxNombre(nombre: string) {
  //   return of(this.listainscripciones).pipe(
  //     map((inscripcions) =>
  //       inscripcions.filter((inscripcion) =>
  //         (inscripcion.nombre + ' ' + inscripcion.apellido + ' ' + inscripcion.email + ' ' + inscripcion.rol + ' ' + inscripcion.id)
  //           .toLowerCase()
  //           .includes(nombre.toLowerCase())
  //       )
  //     ),
  //     catchError((error) => {
  //       throw new Error(error);
  //     })
  //   );
  // }

  obtenerSiguienteId(){
    return Math.max(...this.listaInscripciones.map(o => o.id + 1))
  }
}
