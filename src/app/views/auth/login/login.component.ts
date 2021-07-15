import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;

  posicionHorizontal: MatSnackBarHorizontalPosition = 'right';
  posicionVertical: MatSnackBarVerticalPosition = 'top';
  duracionSegundos = 5;
  codigoMensajeError = 0;
  codigoMensajeInformacion = 1;
  codigoMensajeExito = 2;

  constructor(
    private authSrv: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.authSrv.signInWithEmailAndPassword(this.email, this.password).then(response =>{
       //TODO Mostrar si el usuario esta con el email verificado
      //console.log(response);
      const mensaje = (response.user?.emailVerified) ? "El email del usuario esta verificado" : "Se envío un mensaje a su correo para la verificación";
      
      this.openSnackBar(mensaje, "Inicio de Sesión", (!response.user?.emailVerified)?this.codigoMensajeInformacion : this.codigoMensajeExito);

      (!response.user?.emailVerified) ? response.user?.sendEmailVerification() : this.navigarHome();
    }).catch(err =>{
      //TODO Monstrar un mensaje de error en el html cuando este llege cuando sea Fallido.
      //console.log(err);
      this.openSnackBar(err.message, "Inicio de Sesión", this.codigoMensajeError);
    });
  }

  openSnackBar(message: string, action: string, codigo: number) {
    this.snackBar.open(message, action, {
      duration: this.duracionSegundos * 1000,
      horizontalPosition: this.posicionHorizontal,
      verticalPosition: this.posicionVertical,
      panelClass: this.estilo(codigo)
    });
    
  }

  estilo(codigo: number){
    switch(codigo) { 
      case this.codigoMensajeError: return 'estilo-mensaje-error';
      case this.codigoMensajeInformacion: return 'estilo-mensaje-informacion';
      default: return 'estilo-mensaje-exito';
    }
  }

  navigarHome() {
    this.router.navigate(['home'])
  }
}