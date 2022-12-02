import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';


@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  miFormulario: FormGroup;

  constructor( private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      titular: ['', Validators.required ],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)] ],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)] ],
      cvv: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)] ],
    });

   }

  ngOnInit(): void {
  }

  crearTarjeta(){
    
    const TARJETA: TarjetaCredito ={
      titular: this.miFormulario.value.titular,
      numeroTarjeta: this.miFormulario.value.numeroTarjeta,
      fechaExpiracion: this.miFormulario.value.fechaExpiracion,
      cvv: this.miFormulario.value.titucvvlar,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
      }


      console.log(TARJETA);
      
  }
 
}
