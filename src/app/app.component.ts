import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs/Observable';
//npm install --save rxjs-compat
//import { Observable } from 'rxjs'
import {ChatService} from "./providers/chat.service"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //public chats: Observable<any[]>;                                // Definimos un observable, chats

  //constructor(firestore: AngularFirestore) {                      // Inyectamos el sistema de firebase
  //  this.chats = firestore.collection('chats').valueChanges();    // Asignamos todos los cambios en firebase a chats
  //}
   constructor( public _cs: ChatService){}
}
