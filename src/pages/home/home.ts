import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventos: any[];

  constructor(public navCtrl: NavController,public service: EventoProvider) {
   
  }

  ionViewDidLoad(){
    this.service.findAll().subscribe(retorno => {
      this.eventos = retorno;
      console.log(this.eventos);
    })
  }

  showApostas(evento_id: String){
    this.navCtrl.push('ApostasPage', {evento_id: evento_id})
  }

}
