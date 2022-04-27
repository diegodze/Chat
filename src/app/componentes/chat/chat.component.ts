import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Message } from 'src/app/mensajes';
import { ChatService } from '../../servicios/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('area') foco : any;
  public name : String;
  public mensaje: string;
  public msg: string;
  public room: any;
  public chat: any;

  constructor(
    private navParams:NavParams,
    private modal:ModalController,
    private chatService: ChatService
    ) { }

  ngOnInit() {
    this.name = this.navParams.get('name');
    this.chat = this.navParams.get('chat');
    this.chatService.getChat(this.chat.id).subscribe(r => {this.room = r});
  }

  ngAfterViewChecked(): void {
    this.foco.setFocus();
  }

  cerrarChat(){
    this.modal.dismiss();

  }

  sendMessage(){
    if(this.msg !== ''){
      const nombreUsu = JSON.parse(localStorage.getItem('usuario'));
      const m:Message={
        content: this.msg,
        date: new Date(),
        type: nombreUsu
      };
      this.chatService.enviarABD(m,this.chat.id);
      this.msg='';
    }else{
      this.foco.setFocus();
    }
  }

  convertir(d:any){
    const fecha = d.toDate();
    const dia = fecha.getDay();
    const mes = fecha.getMonth();
    const anio = fecha.getYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    return dia+'/'+mes+'/'+anio+'-'+hora+'-'+minutos;
  }
}//fin de la clase principal
