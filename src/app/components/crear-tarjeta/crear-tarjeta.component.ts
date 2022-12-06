import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from '../../services/tarjeta.service';


@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  miFormulario: FormGroup;
  loading: boolean = false;
  titulo: string = 'agregar tarjeta';
  id: string | undefined;


  constructor( private fb: FormBuilder,
               private _tarjetaService: TarjetaService,
               private toastr: ToastrService
              ) 
  
  
  { 
    //Validacion del formulario.    
    this.miFormulario = this.fb.group({
      titular: ['', Validators.required ],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)] ],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)] ],
      cvv: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ],
    });

   }

  ngOnInit(): void {

    //Funcion para cargar datos para editar el formulario.
    this._tarjetaService.getTarjetaEdita().subscribe(data=>{
      this.id = data.id;
      this.titulo = 'editar tarjeta';

      this.miFormulario.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv,
      })
      
    })
  }

  //Funcion para enviar formulario.
  GuardarTarjeta(){

    if(this.id === undefined){
      //Creamos una tarjeta
      this.agregarTarjeta();
    }else{
      //Editamos una tarjeta
      this.editarTarjeta(this.id);
    }
    
   
  }

  editarTarjeta(id: string){
    const TARJETA: any ={
      titular: this.miFormulario.value.titular,
      numeroTarjeta: this.miFormulario.value.numeroTarjeta,
      fechaExpiracion: this.miFormulario.value.fechaExpiracion,
      cvv: this.miFormulario.value.cvv,
      fechaActualizacion: new Date()
      }

      this.loading = true;
      this._tarjetaService.editarTarjeta(id,TARJETA ).then(()=>{
        this.loading = false;
        this.titulo = 'agregar tarjeta';
        this.miFormulario.reset();
        this.id =  undefined;
        this.toastr.info('La tarjeta fue actualizada con exito', 'Registro actualizado')
      },error=>{

      } )

  }

 

  agregarTarjeta(){


     //Creacion de objeto tarjeta.
     const TARJETA: TarjetaCredito ={
      titular: this.miFormulario.value.titular,
      numeroTarjeta: this.miFormulario.value.numeroTarjeta,
      fechaExpiracion: this.miFormulario.value.fechaExpiracion,
      cvv: this.miFormulario.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
      }

      //spinner.
      this.loading = true;

      //Se conecta con el servicio y se envia tarjeta para crear en firestores.
      this._tarjetaService.guardarTarjeta(TARJETA).then(()=>{
        this.loading = false;
        this.toastr.success('La tarjeta fue registrada con exito.', 'Tarjeta registrada')
        this.miFormulario.reset();
        
      }, error =>{
        this.loading = false;
        this.toastr.error('No se pudo crear la tarjeta.', 'Error')
      })

  }



}
