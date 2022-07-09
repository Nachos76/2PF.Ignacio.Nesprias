import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './formulario-inscripciones.component.html',
  styleUrls: ['./formulario-inscripciones.component.scss']
})
export class FormularioInscripcionesComponent implements OnInit {
  titulo: string = 'Ingresar nueva inscripción';
  constructor() { }

  ngOnInit(): void {
  }

}
