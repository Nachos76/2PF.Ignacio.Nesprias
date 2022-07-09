import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './formulario-cursos.component.html',
  styleUrls: ['./formulario-cursos.component.scss']
})
export class FormularioCursosComponent implements OnInit {
  titulo: string = 'Ingresar nuevo curso';
  constructor() { }

  ngOnInit(): void {
  }

}
