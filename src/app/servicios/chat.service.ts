import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../mensajes';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) { }

  getChatRooms(){
  return this.db.collection('chatRooms').valueChanges({idField:'id'});
  }

  getChat(id: string){
    return this.db.collection('chatRooms').doc(id).valueChanges();
  }

  enviarABD(m:Message, id: string){
    this.db.collection('chatRooms').doc(id).update({
      Messages: firebase.firestore.FieldValue.arrayUnion(m),
    });
  }
}
