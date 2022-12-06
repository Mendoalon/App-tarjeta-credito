import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from '@firebase/util';
import { Subject } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private firestore: AngularFirestore) { }
  private $tarjeta = new Subject<any>();


  //Funcion para conectar a firebase y crear tarjeta.
  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any> {

    return this.firestore.collection('tarjetas').add(tarjeta);
  }


  //Funcion para conectar a firebase y obtener tarjeta de forma acsendebte
  optenerTarjetas() {
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();

  }

  //Funcion para conectar a firebase y eliminar tarjeta.
  eliminarTarjeta(id: string): Promise<any> {

    return this.firestore.collection('tarjetas').doc(id).delete();
  }

  //Funcion para recibir tarjeta a editar.
  addTarjetaEdit(tarjeta: TarjetaCredito) {
    this.$tarjeta.next(tarjeta);

  }

  //Funcion para la tarjeta guardada en el observable $tarjeta
  getTarjetaEdita(){

    return this.$tarjeta.asObservable();
  }


  //Funcion para conectar a firebase y editar la tarjeta.
  editarTarjeta(id: string, tarjeta: any){
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta);
  }

}
