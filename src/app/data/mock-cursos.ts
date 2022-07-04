import { Curso } from '../models/curso.model';
export const CURSOS: Curso[] = [
    {   id:100  , 
        nombre:"Angular a fondo"   ,
        descripcion:"Posta, a fondo, 16 meses de curso, si no salis armando tu propop framework, es porque no fuiste a fondo", 
        fechaInicio:"2022-07-01", 
        cantClases:366, 
        precio:1520 ,
        capacidad:10 ,
        estado:1  , 
        imagen:null   
    },
    {   id:101  , 
        nombre:"HTML + CSS"   ,
        descripcion:"Inrducción a la web clasica, lo que ves lo tenes", 
        fechaInicio:"2022-08-01", 
        cantClases:16, 
        precio:100 ,
        capacidad:150 ,
        estado:1  , 
        imagen:null   
    },
    {   id:103  , 
        nombre:"Backend .Net, Api y mas"   ,
        descripcion:"al fondo, al fondo, vemos que pasa detras de la cortina", 
        fechaInicio:"2022-07-15", 
        cantClases:32, 
        precio:500 ,
        capacidad:35 ,
        estado:0  , 
        imagen:null   
    },
    {   id:104  , 
        nombre:"Backend .Net, Api y mas V2"   ,
        descripcion:"Ahora si, al fondo, al fondo, vemos que pasa detras de la cortina", 
        fechaInicio:"2022-07-15", 
        cantClases:32, 
        precio:500 ,
        capacidad:35 ,
        estado:1  , 
        imagen:null   
    }
  ];