import { Component, OnInit } from '@angular/core';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjetas: TarjetaCredito [] = [];

  constructor(private _tarjetaService: TarjetaService) { }

  ngOnInit(): void {
    this.optenerTarjetas()
  }


  //Funcion para obtener tarjetas.
  optenerTarjetas(){
    this._tarjetaService.optenerTarjetas().subscribe(data =>{
      this.listTarjetas = [];
      data.forEach( (tarjeta: any)=>{
        this.listTarjetas.push({
          id:  tarjeta.payload.doc.id,
          ...tarjeta.payload.doc.data()
        });
      });

      console.log(this.listTarjetas);
      

    })
  }

}
