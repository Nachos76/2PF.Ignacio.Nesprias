import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { DetalleInscripcionesComponent } from './detalle-inscripciones/detalle-inscripciones.component';
import { FormularioInscripcionesComponent } from './formulario-inscripciones/formulario-inscripciones.component';



@NgModule({
  declarations: [
    ListadoInscripcionesComponent,
    DetalleInscripcionesComponent,
    FormularioInscripcionesComponent,
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class InscripcionesModule { }
