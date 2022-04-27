import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ChatComponent } from './componentes/chat/chat.component';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { ChatService } from './servicios/chat.service';
import { AuthService } from './servicios/auth.service';

@NgModule({
  declarations: [AppComponent, ChatComponent],
  entryComponents: [ChatComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, FormsModule, AngularFireDatabaseModule, AngularFirestoreModule],
  providers: [{
  provide: RouteReuseStrategy,
  useClass: IonicRouteStrategy},
  ChatService,
  AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
