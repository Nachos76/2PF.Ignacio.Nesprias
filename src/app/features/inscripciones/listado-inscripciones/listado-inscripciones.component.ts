import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InscripcionesService } from '../../../core/services/inscripciones.service';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  titulo: string = 'Listado de Inscripciones';

  constructor( 
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  agregar() {
    this.inscripcionesService.seleccionarInscripcionxIndice(-1);
    this.router.navigate(['/inscripciones/form']);
  }
}
