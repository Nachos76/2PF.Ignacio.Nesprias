import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {

  titulo: string = 'Listado de Cursos';

  constructor() { }

  ngOnInit(): void {
  }

}
