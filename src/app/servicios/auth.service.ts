import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
user:any;
nombre:string;
  constructor(private afauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  login(email: string, password: string){
    return new Promise((resolve, rejected)=>{this.afauth.signInWithEmailAndPassword(email,password).then(
      res => {
      const uid = res.user.uid;
      this.db.collection('users').doc(uid).valueChanges().subscribe(r =>{this.user = r;
      this.nombre = this.user.name;
      localStorage.setItem('usuario',JSON.stringify(this.nombre));
      });



      resolve(res);}).catch(err => rejected(err));});
  }

  logout(){
    this.afauth.signOut().then(()=>{
      this.nombre = '';
      this.user = null;
      localStorage.setItem('usuario',JSON.stringify(''));

      this.router.navigate(['/login'])});

  }


  registrar(name:string,email: string, password:string){
    return new Promise((resolve, reject) => {
      this.afauth.createUserWithEmailAndPassword(email,password).
      then(res => {
        const uid =  res.user.uid;
        this.db.collection('users').doc(res.user.uid).set({
          name : name,
          uid : uid
      })
          resolve(res)
      }).catch(err => reject(err));
    });
  }
}

