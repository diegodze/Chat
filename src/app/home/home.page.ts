import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { AngularFireList,  AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ChatComponent } from '../componentes/chat/chat.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatService } from '../servicios/chat.service';
import { actionSheetController } from '@ionic/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public chats: any = [];
  public mensajes : any = [];
  //public chats : AngularFireList<any>;
  //public bd : Observable<any[]>;

  constructor(private s:AuthService, private afdb: AngularFireDatabase, private modal : ModalController, public ChatService: ChatService, public asc:ActionSheetController) {}

  logout(){
  this.s.logout();
  }

  ngOnInit(): void {
    this.ChatService.getChatRooms().subscribe(chatsBD =>{this.chats = chatsBD} );
  }

  openChat(chat: any){
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat
      }
    }).then((modal)=>modal.present());
  }

  async presentActionSheet(){
  const actionSheet = await this.asc.create({
    header: 'Opciones',
    cssClass: 'mi-clase',
    buttons: [{
      text: 'cerrar sesion',
      role: 'destructive',
      icon: 'log-out',
      handler:() => {
        this.logout();
      }
    }]
  });
  await actionSheet.present();
}

}
