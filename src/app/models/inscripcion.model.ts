import { Alumno } from './alumno.model';
import { Curso } from './curso.model';
export interface Inscripcion {
    id:number,
    curso:Curso,
    alumno:Alumno,
    estado:number
}