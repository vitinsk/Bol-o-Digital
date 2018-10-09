import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public auth: AuthProvider) {
  }


  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }

    ionViewDidEnter(){
      this.auth.refreshToken()
      .subscribe(response =>{     
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('EventoPage')
      },
      error => {});
    }

    

    login(){
      this.auth.authenticate(this.creds)
      .subscribe(response =>{ 
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('EventoPage')
      },
      error => {});
      
      
    }

  signup() {
   // this.navCtrl.push(SignupPage);
    let modalAposta = this.modalCtrl.create('SignupPage');
    modalAposta.present();
  }

 


}
