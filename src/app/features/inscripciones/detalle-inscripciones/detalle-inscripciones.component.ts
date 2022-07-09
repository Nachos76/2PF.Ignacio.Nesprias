import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './detalle-inscripciones.component.html',
  styleUrls: ['./detalle-inscripciones.component.scss']
})
export class DetalleInscripcionesComponent implements OnInit {
  titulo: string = 'Detalles de la inscripción';
  constructor() { }

  ngOnInit(): void {
  }

}
