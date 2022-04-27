import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  user:any;

  constructor(private authService: AuthService, public router: Router, private db:AngularFirestore) {
    this.email='';
    this.password='';
   }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).then(res1 =>{
      this.router.navigate(['/home']);}).catch(err => alert('Los datos son incorrectos o no existe el usuario o email'));
  }

  registro(){
    this.router.navigate(['/registro']);
  }

}
