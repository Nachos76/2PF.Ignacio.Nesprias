import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from 'src/app/core/services/cursos.service';
import { Curso } from 'src/app/models/curso.model';

@Component({
  templateUrl: './detalle-cursos.component.html',
  styleUrls: ['./detalle-cursos.component.scss']
})
export class DetalleCursosComponent implements OnInit {
  titulo: string = 'Detalle del curso';
  susbcriptions: Subscription = new Subscription();
  curso?: Curso;

  constructor(
    private cursoService: CursosService, 
    private router: Router) { }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.cursoService.obtenerCursoSeleccionado().subscribe({
        next: (curso) => {
          if (curso) {
            this.curso = curso;
          } else {
            this.curso = undefined;
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  volver(): void {
    this.router.navigate(['/cursos']);
  }

}
