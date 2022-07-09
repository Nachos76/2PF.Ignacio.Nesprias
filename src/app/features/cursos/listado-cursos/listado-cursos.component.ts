import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {

  titulo: string = 'Listado de Cursos';

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  agregar() {
    this.cursosService.seleccionarCursoxIndice(-1);
    this.router.navigate(['/cursos/form']);
  }

}
