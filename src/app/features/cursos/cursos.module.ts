import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { FormularioCursosComponent } from './formulario-cursos/formulario-cursos.component';


@NgModule({
  declarations: [
    ListadoCursosComponent,
    DetalleCursosComponent,
    FormularioCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CursosModule { }
