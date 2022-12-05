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
  }

  //Funcion para enviar formulario.
  crearTarjeta(){
    
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
        console.log('tarjeta creada');
        this.toastr.success('La tarjeta fue registrada con exito.', 'Tarjeta registrada')
        this.miFormulario.reset();
        
      }, error =>{
        this.loading = false;
        console.log('error: ',error);
        this.toastr.error('No se pudo crear la tarjeta.', 'Error')
      })
  }
 
}
