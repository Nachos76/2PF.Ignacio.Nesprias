import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss']
})
export class DetalleAlumnoComponent implements OnInit {
  titulo: string = 'Detalle del alumno';
  susbcriptions: Subscription = new Subscription();
  alumno?: Alumno;

  // showModal = false;
  // alumno!:Alumno;
  defaultImagen : string = 'assets/avatars/avatar.png'

  constructor(
    private alumnosService : AlumnosService,

    private router : Router,
  ) { }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.susbcriptions.add(
      this.alumnosService.obtenerAlumnoSeleccionado().subscribe({
        next: (alumno) => {
          if (alumno) {
            this.alumno = alumno;
          } else {
            this.alumno = undefined;
          }
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }

  
  // toggleModal(){
  //   this.showModal = !this.showModal;
  // }
  
  reemplazarURL(str?:string|null){
    return str?.replace("https://getavataaars.com/", "https://avataaars.io/");

 }
 volver(): void {
  this.router.navigate(['/alumnos']);
}
}
