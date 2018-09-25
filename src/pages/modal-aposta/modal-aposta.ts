import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalApostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-aposta',
  templateUrl: 'modal-aposta.html',
})
export class ModalApostaPage {
  aposta : any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public view: ViewController) {
  }

  ionViewDidLoad() {
    this.aposta = this.navParams.get('dados');    
    console.log(this.aposta);
  }

  voltar(){
    this.view.dismiss();
  }

}
