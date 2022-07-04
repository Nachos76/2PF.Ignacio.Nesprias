import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-titulo-grilla',
  templateUrl: './titulo-grilla.component.html',
  styleUrls: ['./titulo-grilla.component.scss']
})
export class TituloGrillaComponent implements OnInit {

  @Input()
  titulo!:string
  @Input()
  incluirNuevo!:boolean
  @Output()
  nuevoClicked = new EventEmitter<any>();  
  
  constructor() { }

  ngOnInit(): void {
  }

  agregarItem(){
    this.nuevoClicked.emit();  
  }
}
