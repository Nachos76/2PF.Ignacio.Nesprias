import { Alumno } from './../../../models/alumno.model';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { ALUMNOS } from 'src/app/data/mock-alumnos';
import { DetalleAlumnoComponent } from '../detalle-alumno/detalle-alumno.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioAlumnoComponent } from '../formulario-alumno/formulario-alumno.component';
import { GrillaComponent } from 'src/app/shared/components/grilla/grilla.component';


@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})

export class ListadoAlumnosComponent implements OnInit {

  titulo:string="Listado de Alumnos"
  alumnos:Alumno[] = ALUMNOS//recupero el array de alumnos de la contante ALUMNOS que esta en mock-alumnos.ts
  //alumnos!:alumno[]
  //alumnos=ALUMNOS 
  seleccionado!:Alumno
  //seleccionados: alumno[] = [];
  aeliminar?:number

  @ViewChild('DetalleModal', {static: false}) DetalleModal?: DetalleAlumnoComponent;
  @ViewChild('grilla', {static: false}) grilla?: GrillaComponent;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  seleccionarAlumno($event: any) {
    this.seleccionado = $event;
    //this.seleccionados.push($event); 
    console.log(this.seleccionado);

    this.DetalleModal?.toggleModal();
    this.DetalleModal!.alumno = $event;

  }
  actualizarAlumno($event: any) {
    this.seleccionado = $event;
    //this.seleccionados.push($event); 
    // console.log(this.seleccionado);

    // this.DetalleModal?.toggleModal();
    // this.DetalleModal!.alumno = $event;

    if ($event) {
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      // dialogConfig.autoFocus = true;
     //dialogConfig.width='60%',
     dialogConfig.panelClass="h-screen";
     dialogConfig.data = {
        title: 'Actualizar datos del alumno',
        message: '',
        item:this.seleccionado
        
      };


    const confirmDialog = this.dialog.open(FormularioAlumnoComponent, dialogConfig);
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        let itemIndex = this.alumnos.findIndex(item => item.id == result.id);
        this.alumnos[itemIndex] = result;
        this.grilla?.renderRows();

        // this.alumnos = this.alumnos.filter((value,key)=>{
        //   if(value.id == result.id){
        //     value.nombre = result.nombre;
        //     value.apellido= result.apellido,
        //     value.sexo= result.sexo,
        //     value.dni= result.dni,
        //     value.fechaNacimiento= result.fechaNacimiento,
        //     value.direccion=result.direccion,
        //     value.telefono=result.telefono,
        //     value.email=result.email,
        //     value.conocimientos=result.conocimientos,
        //     value.cursos=result.cursos,
        //     value.imagen=result.imagen,
        //     value.descripcion=result.descripcion,
        //     value.estado=result.estado,
        //     value.password=result.password,
        //     value.confirmPassword=result.confirmPassword
        //   }
        //   return true;
        // });
      }
    });
  }

  }
  eliminarAlumno($event: any) {
    
    this.aeliminar = $event;
    //console.log(this.aeliminar);
    this.alumnos = this.alumnos.filter(item => item.id !== this.aeliminar);
    //this.seleccionados.push($event); 
  }

  agregarAlumno($event: any) { 
    if ($event) {
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.disableClose = true;
      // dialogConfig.autoFocus = true;
     //dialogConfig.width='60%',
     dialogConfig.data = {
        title: 'Ingresar Nuevo Alumno',
        message: '',
        item:null
        
      };


    const confirmDialog = this.dialog.open(FormularioAlumnoComponent, dialogConfig);
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
       
        result.id=Math.max(...this.alumnos.map(o => o.id + 1))
        this.alumnos.push(result); 
        this.grilla?.renderRows();
        //console.log($event);
      }
    });
  }
  }
}