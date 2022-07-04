import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.scss'],
})
export class FormularioAlumnoComponent implements OnInit {
  title?: string;
  message?: string;
  alumno?: Alumno;
  local_data:any;

  @Output()
  enviarNuevoAlumno = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<FormularioAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.local_data = {...data};
    //this.alumno = this.local_data.item;
    this.cargarAlumnoParaEditar(this.local_data.item);
  }

  ngOnInit() {}

  formularioAlumno = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required]],
    dni: [''],
    sexo: [''],
    fechaNacimiento: ['', [Validators.required,this.fechaValidator]],
    direccion: [''],
    telefono: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    conocimientos: [[]],
    cursos: [['']],
    imagen: [''],
    descripcion: [''],
    estado: ['Activo'],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        this.passwordMatchValidator,
      ],
    ],
  });

  passwordMatchValidator(g: AbstractControl) {
    return g.parent?.get('password')?.value ===
      g.parent?.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  fechaValidator(g: AbstractControl) {
    return new Date(g.value).getTime() < Date.now()
      ? null
      : { invalid: true };
  }


  // guardarAlumno() {
  //   //console.log(this.formularioAlumno.value);
  //   this.enviarNuevoAlumno.emit(this.formularioAlumno.value);
  //   //this.showModal = !this.showModal;
  //   this.formularioAlumno.reset();
  // }

  cargarAlumnoParaEditar(alumno?: Alumno) {
    if (alumno) {
      this.formularioAlumno.patchValue({
        id: alumno.id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        sexo: alumno.sexo,
        dni: alumno.dni,
        fechaNacimiento: alumno.fechaNacimiento,
        direccion:alumno.direccion,
        telefono:alumno.telefono,
        email:alumno.email,
        conocimientos:alumno.conocimientos,
        cursos:alumno.cursos,
        imagen:alumno.imagen,
        descripcion:alumno.descripcion,
        estado:alumno.estado,
        password:alumno.password,
        confirmPassword:alumno.confirmPassword

      });
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.conocimientos?.value.push(value);
      this.conocimientos?.updateValueAndValidity();
    }


    // Clear the input value
    event.chipInput!.clear();
  }

  remove(_conocimientos: string): void {
    const index = this.conocimientos?.value.indexOf(_conocimientos);

    if (index >= 0) {
      this.conocimientos?.value.splice(index, 1);    // where index = index of removed element
      this.conocimientos?.updateValueAndValidity();
    }
  }

  // use getter method to access courseIds control value easily
  get conocimientos() {
  return this.formularioAlumno.get('conocimientos');
}
}
