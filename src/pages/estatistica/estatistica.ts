import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Receita } from '../../models/receita';
import { AdminProvider } from '../../providers/admin/admin';


/**
 * Generated class for the EstatisticaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estatistica',
  templateUrl: 'estatistica.html',
})
export class EstatisticaPage {

  receita : Receita;
  constructor(public navCtrl: NavController, public navParams: NavParams, public adminService: AdminProvider) {
  }

  display: boolean = false;

  showDialog() {
      this.display = true;
  }

  ionViewDidLoad() {
   this.findReceita();
  }

  findReceita(){
    this.adminService.findReceita().subscribe(response => {
      this.receita = response,
      error => {
        
      }
    })
  }

  voltar(){
    this.navCtrl.pop();
  }

}
