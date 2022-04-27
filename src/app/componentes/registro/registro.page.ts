import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public email: string;
  public password: string;
  public name : string;
  constructor(public router:Router, private aFauth:AuthService) {
    this.email='';
    this.password='';
    this.name='';
   }

  ngOnInit() {
  }

  regresar(){
    this.router.navigate(['/home']);
  }

  registrar(){
    this.aFauth.registrar(this.name,this.email,this.password).then(
      aFauth => {
        console.log(aFauth)
       this.router.navigate(['/home']);
      }).catch(err => console.log(err));
  }

  preparado(){
    this.router.navigate(['/login']);
  }


}
