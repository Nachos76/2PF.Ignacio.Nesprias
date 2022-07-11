import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap, map, Observable, Subscription } from 'rxjs';
import { CursosService } from 'src/app/core/services/cursos.service';
import { Curso } from 'src/app/models/curso.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoCursosComponent implements OnInit {

  titulo: string = 'Listado de Cursos';
  displayedColumnsTable = ['id', 'nombre', 'descripcion', 'cantClases','capacidad','fechaInicio','estado', 'actions'];
  tableDataSource$: Observable<MatTableDataSource<Curso>> | undefined;

  cursoSelect: Curso | null = null;

  susbcriptions: Subscription = new Subscription();

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private router: Router
    ) { 
      this.tableDataSource$ = this.cursosService.obtenerCursos().pipe(
        tap((cursos) => console.log(cursos)),
        map((cursos) => new MatTableDataSource<Curso>(cursos))
      );
    }

  ngOnInit(): void {
  }

  agregar() {
    this.cursosService.seleccionarCursoxIndice(-1);
    this.router.navigate(['/cursos/form']);
  }

  seleccionar(index?: number) {
    this.cursosService.seleccionarCursoxId(index);
    this.router.navigate(['/cursos/detalle']);
  }

  eliminar(item?: Curso) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de  ' +
        item?.nombre ,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.cursosService.borrarCursoporId(item?.id);
      }
    });
  }

  editar(index?: number) {
    this.cursosService.seleccionarCursoxId(index);
    this.router.navigate(['/cursos/form']);
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource$ = this.cursosService.buscarCursoxNombre(filterValue).pipe(
      map((cursos) => new MatTableDataSource<Curso>(cursos))
    );
  }


}
