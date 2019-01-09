import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';

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
    public auth: AuthProvider,
  public alertCtrl: AlertController,
public loadingCtrl: LoadingController,
public messageService : MessageService) {
  }

  showSuccess() {
    this.messageService.add({key: 'myKey1', severity:'success', summary: 'Summary Text', detail: 'Detail Text'});
}

  ionViewDidLeave() {
  
    this.menu.swipeEnable(true);
    }


    ionViewDidEnter(){
   
 
      this.menu.swipeEnable(false);
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
        this.presentLoading();
        
        setTimeout(() => {
          this.navCtrl.setRoot('EventoPage')
        }, 1500);
      },
      error => {
        this.showError(error)
      });
      
      
    }

  signup() {
   // this.navCtrl.push(SignupPage);
    let modalAposta = this.modalCtrl.create('SignupPage');
    modalAposta.present();
  }

  showError(error: HttpErrorResponse){
    let alert = this.alertCtrl.create({
      title:'Falha na autenticação.',
      message: "Email e/ou senha inválidos.",
      enableBackdropDismiss: false,
      buttons:[{
        text:'OK',
       
      }]
    });
    alert.present();
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Carregando dados...",
      duration: 2000
    });
    loader.present();
  }

 


}
