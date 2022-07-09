import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { CURSOS } from 'src/app/data/mock-cursos';
import { Curso } from 'src/app/models/curso.model';


@Injectable({
  providedIn: 'root',
})
export class CursosService {
  listaCursos: Curso[] = CURSOS;
  cursoSeleccionado$ = new BehaviorSubject<Curso | null>(null);
  cursos$ = new BehaviorSubject<Curso[]>(this.listaCursos);



  constructor() {}

  agregarCurso(curso: Curso) {
    this.listaCursos.push(curso);
    this.cursos$.next(this.listaCursos);
  }

  obtenerCurso() {
    return this.cursos$.asObservable();
  }

  obtenerCursoSeleccionado() {
    return this.cursoSeleccionado$.asObservable();
  }

  seleccionarCursoxIndice(index?: number) {
    this.cursoSeleccionado$.next(
      index !== undefined ? this.listaCursos[index] : null
    );
  }

  borrarCursoporIndice(index?: number) {
    this.listaCursos = this.listaCursos.filter((_, i) => index != i);
    this.cursos$.next(this.listaCursos);
  }

  editarCurso(curso: Curso) {
    let itemIndex = this.listaCursos.findIndex(item => item.id == curso.id);
    this.listaCursos[itemIndex]=curso;
    this.cursos$.next(this.listaCursos);
  }

  buscarCursoxNombre(nombre: string) {
    return of(this.listaCursos).pipe(
      map((curso) =>
      curso.filter((curso) =>
          (curso.nombre + ' ' +  curso.id)
            .toLowerCase()
            .includes(nombre.toLowerCase())
        )
      ),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

 
  obtenerSiguienteId(){
    return Math.max(...this.listaCursos.map(o => o.id + 1))
  }
}
