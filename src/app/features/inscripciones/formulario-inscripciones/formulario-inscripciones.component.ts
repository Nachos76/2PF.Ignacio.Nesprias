import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Inscripcion } from 'src/app/models/inscripcion.model';

@Component({
  templateUrl: './formulario-inscripciones.component.html',
  styleUrls: ['./formulario-inscripciones.component.scss']
})
export class FormularioInscripcionesComponent implements OnInit {
  titulo: string = 'Ingresar nueva inscripción';
  susbcriptions: Subscription = new Subscription();

  formulario = this.fb.group(
    {
      id: [''],
      curso: ['', [Validators.required, Validators.minLength(3)]],
      alumno: ['', [Validators.required, Validators.minLength(3)]],
      fecha: [''],
      estado: ['', [Validators.required]]
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inscripcionesService: InscripcionesService
  ) { }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
   this.susbcriptions.add(
      this.inscripcionesService.obtenerInscripcionSeleccionado().subscribe({
        next: (inscripcion) => {
          if (inscripcion) {
            this.formulario.patchValue(inscripcion);
          } else {
            this.formulario.reset();
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }


  cancelar() {
    this.router.navigate(['/inscripciones']);
  }

  agregarInscripcion(inscripcion: Inscripcion) {
    if (inscripcion.id) {
      //es usuario existente
      this.inscripcionesService.editarInscripcion(inscripcion);
    } else {
      //es nuevo usuario
      inscripcion.id = this.inscripcionesService.obtenerSiguienteId();
      this.inscripcionesService.agregarInscripcion(inscripcion);
    }
    this.router.navigate(['/inscripciones']);
    this.formulario.reset();
  }

  volver(): void {
    this.router.navigate(['/inscripciones']);
  }

}
function Inscripcion(inscripcion: any, Inscripcion: any) {
  throw new Error('Function not implemented.');
}

