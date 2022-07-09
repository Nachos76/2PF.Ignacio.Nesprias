import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './detalle-cursos.component.html',
  styleUrls: ['./detalle-cursos.component.scss']
})
export class DetalleCursosComponent implements OnInit {
  titulo: string = 'Detalle del curso';
  constructor() { }

  ngOnInit(): void {
  }

}
