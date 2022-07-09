import { NgModule } from '@angular/core';
import {Routes,RouterModule,PreloadingStrategy,  PreloadAllModules} from "@angular/router";
  
import { ListadoAlumnosComponent } from './features/alumnos/listado-alumnos/listado-alumnos.component';
import { ListadoCursosComponent } from './features/cursos/listado-cursos/listado-cursos.component';



const routes: Routes = [
  { path: '', component: ListadoCursosComponent},
  { path: 'cursos', loadChildren: () => import('./features/cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'alumnos', component: ListadoAlumnosComponent},
  { path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'inscripciones', loadChildren: () => import('./features/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) },

   //{path:'**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
