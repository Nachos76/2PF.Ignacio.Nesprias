import { Alumno } from './../../../models/alumno.model';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { tap, map, Observable, Subscription } from 'rxjs';
import { ALUMNOS } from 'src/app/data/mock-alumnos';
import { DetalleAlumnoComponent } from '../detalle-alumno/detalle-alumno.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioAlumnoComponent } from '../formulario-alumno/formulario-alumno.component';
import { GrillaComponent } from 'src/app/shared/components/grilla/grilla.component';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})

export class ListadoAlumnosComponent implements OnInit {

  titulo:string="Listado de Alumnos"
  displayedColumnsTable = ['id', 'nombre', 'edad', 'fechaNacimiento','conocimientos','cursos','estado', 'actions'];
  tableDataSource$: Observable<MatTableDataSource<Alumno>> | undefined;

  cursoSelect: Alumno | null = null;

  susbcriptions: Subscription = new Subscription();


  alumnos:Alumno[] = ALUMNOS//recupero el array de alumnos de la contante ALUMNOS que esta en mock-alumnos.ts
  seleccionado!:Alumno
  aeliminar?:number

  @ViewChild('DetalleModal', {static: false}) DetalleModal?: DetalleAlumnoComponent;
  @ViewChild('grilla', {static: false}) grilla?: GrillaComponent;


  constructor(
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    this.tableDataSource$ = this.alumnosService.obtenerAlumnos().pipe(
      tap((alumnos) => console.log(alumnos)),
      map((alumnos) => new MatTableDataSource<Alumno>(alumnos))
    );
  }

  ngOnInit(): void {
  }
  
  agregar() {
    this.alumnosService.seleccionarAlumnoxIndice(-1);
    this.router.navigate(['/alumnos/form']);
  }

  seleccionar(index?: number) {
    this.alumnosService.seleccionarAlumnoxId(index);
    this.router.navigate(['/alumnos/detalle']);
  }

  eliminar(item?: Alumno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de  ' +
        item?.nombre + ' ' + item?.apellido,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.alumnosService.borrarAlumnoporId(item?.id);
      }
    });
  }

  editar(index?: number) {
    this.alumnosService.seleccionarAlumnoxId(index);
    this.router.navigate(['/alumnos/form']);
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource$ = this.alumnosService.buscarAlumnoxNombre(filterValue).pipe(
      map((alumnos) => new MatTableDataSource<Alumno>(alumnos))
    );
  }



  // seleccionarAlumno($event: any) {
  //   this.seleccionado = $event;
  //   //this.seleccionados.push($event); 
  //   console.log(this.seleccionado);

  //   this.DetalleModal?.toggleModal();
  //   this.DetalleModal!.alumno = $event;

  // }
  // actualizarAlumno($event: any) {
  //   this.seleccionado = $event;
  //   //this.seleccionados.push($event); 
  //   // console.log(this.seleccionado);

  //   // this.DetalleModal?.toggleModal();
  //   // this.DetalleModal!.alumno = $event;

  //   if ($event) {
  //     const dialogConfig = new MatDialogConfig();
  //     // dialogConfig.disableClose = true;
  //     // dialogConfig.autoFocus = true;
  //    //dialogConfig.width='60%',
  //    dialogConfig.panelClass="h-screen";
  //    dialogConfig.data = {
  //       title: 'Actualizar datos del alumno',
  //       message: '',
  //       item:this.seleccionado
        
  //     };


  //   const confirmDialog = this.dialog.open(FormularioAlumnoComponent, dialogConfig);
  //   confirmDialog.afterClosed().subscribe(result => {
  //     if (result) {
  //       let itemIndex = this.alumnos.findIndex(item => item.id == result.id);
  //       this.alumnos[itemIndex] = result;
  //       this.grilla?.renderRows();

  //       // this.alumnos = this.alumnos.filter((value,key)=>{
  //       //   if(value.id == result.id){
  //       //     value.nombre = result.nombre;
  //       //     value.apellido= result.apellido,
  //       //     value.sexo= result.sexo,
  //       //     value.dni= result.dni,
  //       //     value.fechaNacimiento= result.fechaNacimiento,
  //       //     value.direccion=result.direccion,
  //       //     value.telefono=result.telefono,
  //       //     value.email=result.email,
  //       //     value.conocimientos=result.conocimientos,
  //       //     value.cursos=result.cursos,
  //       //     value.imagen=result.imagen,
  //       //     value.descripcion=result.descripcion,
  //       //     value.estado=result.estado,
  //       //     value.password=result.password,
  //       //     value.confirmPassword=result.confirmPassword
  //       //   }
  //       //   return true;
  //       // });
  //     }
  //   });
  // }

  // }
  // eliminarAlumno($event: any) {
    
  //   this.aeliminar = $event;
  //   //console.log(this.aeliminar);
  //   this.alumnos = this.alumnos.filter(item => item.id !== this.aeliminar);
  //   //this.seleccionados.push($event); 
  // }

  // agregarAlumno($event: any) { 
  //   if ($event) {
  //     const dialogConfig = new MatDialogConfig();
  //     // dialogConfig.disableClose = true;
  //     // dialogConfig.autoFocus = true;
  //    //dialogConfig.width='60%',
  //    dialogConfig.data = {
  //       title: 'Ingresar Nuevo Alumno',
  //       message: '',
  //       item:null
        
  //     };


  //   const confirmDialog = this.dialog.open(FormularioAlumnoComponent, dialogConfig);
  //   confirmDialog.afterClosed().subscribe(result => {
  //     if (result) {
       
  //       result.id=Math.max(...this.alumnos.map(o => o.id + 1))
  //       this.alumnos.push(result); 
  //       this.grilla?.renderRows();
  //       //console.log($event);
  //     }
  //   });
  // }
  // }
}