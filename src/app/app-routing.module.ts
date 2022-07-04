import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoAlumnosComponent } from './features/alumnos/listado-alumnos/listado-alumnos.component';
import { ListadoCursosComponent } from './features/cursos/listado-cursos/listado-cursos.component';
import { ListadoInscripcionesComponent } from './features/inscripciones/listado-inscripciones/listado-inscripciones.component';
import { ListadoUsuariosComponent } from './features/usuarios/listado-usuarios/listado-usuarios.component';
import { FormularioUsuariosComponent } from './features/usuarios/formulario-usuarios/formulario-usuarios.component';

const routes: Routes = [
  {path: 'cursos', component: ListadoCursosComponent},
  {path: 'alumnos', component: ListadoAlumnosComponent},
  {path: 'inscripciones', component: ListadoInscripcionesComponent},
  {path: 'usuarios', component: ListadoUsuariosComponent},
  {path: 'form-usuarios', component: FormularioUsuariosComponent},
  // {path: 'form-usuarios/:index', component: FormularioUsuariosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
