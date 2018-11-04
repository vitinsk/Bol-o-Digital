import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tab1 } from './component/tab1';
import { Tab2 } from './component/tab2';
import { STORAGE_KEYS } from '../../config/storage_keys.config';



/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  tab1: any;
  tab2: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem(STORAGE_KEYS.localUser) == null){     
      this.navCtrl.setRoot('LoginPage');
      return null
    }
    this.tab1 = Tab1;
    this.tab2 = Tab2;
  }


  ionViewDidLoad() {
   
  }

}
