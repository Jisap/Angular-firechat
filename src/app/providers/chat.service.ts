import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';                     // RxJS es una librería muy útil de Javascript, que te ayuda a gestionar secuencias de eventos.
                                                          // Este map aplica una función a cada valor emitido por la fuente observable y emite un nuevo observable  

import { AngularFireAuth } from '@angular/fire/auth';
import  firebase  from 'firebase/app';

@Injectable()
export class ChatService {

  private itemsCollection?: AngularFirestoreCollection<Mensaje>;       // cada uno de los mensaje de la colección/nodo chats

  public chats: Mensaje[] = [];                                        // Arreglo con los mensajes, en principio vacio.

  public usuario: any = {};

  constructor(private afs: AngularFirestore,                           // Se carga el sistema de Firebase 
              public auth: AngularFireAuth) {                          // y su sistema de autenticación

    this.auth.authState.subscribe(user => {                  // nos suscribimos a cualquier cambio en el estado de la autenticación

      console.log('Estado del usuario:', user)              // Este sistema genera un user autenticado

      if(!user){                                            // Sino existe return para volver a empezar
        return;
      }

      this.usuario.nombre = user.displayName;              // Si si existe introducimos una prop(nombre) en usuario = user.displayname
      this.usuario.uid = user.uid;                         // Lo mismo con el uid 
    })                        
  }                        

  login(proveedor: string) {

    if(proveedor === 'google'){

      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());  // Login con google en firebase
    }else{
      this.auth.signInWithPopup(new firebase.auth.OAuthProvider('yahoo.com')); // Login con Yahoo
    }
  }
  logout() {
    this.usuario = {};                                    // Restablecemos el usuario como vacio
    this.auth.signOut();                                  // Deslogueamos
  }

  cargarMensajes(){                                                    // Método para cargar mensajes

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc').limitToLast(5));
                  //promise                                            // Los mensajes vendrán de la coleccion chats de Firebase
    return this.itemsCollection.valueChanges()                         // Este método devolverá todos los cambios (observable) en los mensajes de esa colección
      .pipe(map((mensajes: Mensaje[]) => {                             // cada mensaje realizado se introducirá en el array chats
        console.log(mensajes);                                         // Para ello usamos pipe(map) 
        this.chats = mensajes                                          // pipe permite el procesamiento de una serie de elementos (observables)
      }) )                                                             // de modo que la salida de cada elemento sea la entrada del siguiente   
                                                                       // Cuando se recibe un nuevo mensaje este se introduce en chats que contiene los anteriores
  }                                                                    

  agregarMensaje( texto: string ){

    let mensaje: Mensaje ={
      nombre: this.usuario.nombre,
      mensaje: texto,                    // Esta prop esta ligada al input del html con ngModel
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
                //promise
    return this.itemsCollection?.add(mensaje);                               // Inserción de un mensaje en Firebase
  }
}
