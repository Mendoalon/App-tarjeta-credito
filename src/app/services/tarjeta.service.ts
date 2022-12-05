import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from '@firebase/util';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor( private firestore: AngularFirestore) { }

  
  //Funcion para conectar a firebase y crear tarjeta.
  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any>{
    
    return this.firestore.collection('tarjetas').add(tarjeta);
  }


  //Funcion para conectar a firebase y obtener tarjeta de forma acsendebte
  optenerTarjetas() {
     return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();

  }

  eliminarTarjeta(id: string): Promise<any>{

   return this.firestore.collection('tarjetas').doc(id).delete();
  }



}
