import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})

export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor(public _cs: ChatService) {  // Inyectamos el servicio de chat _cs al arrancar la app

    this._cs.cargarMensajes()             // Usamos su método cargarMensajes()    
      .subscribe(() => {                  // que nos devuelve los mensajes recibidos (Promesas) a los que estamos suscritos.
                                          // Estos mensajes estaban dentro de chats: Mensaje[] y serán usados en el html

        this.elemento.scrollTop = this.elemento.scrollHeight; // El scroll se posicionará al principio del documento
 
      })                         
        
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes'); // Identificamos la caja de los mensajes
  }

  enviar_mensaje(){
    console.log(this.mensaje)

    if(this.mensaje.length === 0){
      return
    }

    this._cs.agregarMensaje(this.mensaje)                    // Agregar mensaje recibe el mensaje del input.
      ?.then( ()=>this.mensaje = "" )                        // Si tiene exito borra el mensaje de la caja de texto.
      .catch( (err)=>console.error('Error al enviar', err))  // Sino mensaje de error.
  }

}
