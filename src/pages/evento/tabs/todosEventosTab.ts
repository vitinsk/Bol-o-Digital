import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { STORAGE_KEYS } from '../../../config/storage_keys.config';
import { EventoProvider } from '../../../providers/evento/evento';




@Component({
  templateUrl: 'todosEventosTab.html',
})
export class TodosEventosTab {

  eventos: any[]; 
  constructor(public navCtrl: NavController,public service: EventoProvider) {

  }

  ionViewDidEnter(){

    if(localStorage.getItem(STORAGE_KEYS.localUser) == null){     
      this.navCtrl.setRoot('LoginPage');
      return
    }
    
    this.service.findAll().subscribe(retorno => {
      this.eventos = retorno; 
    })
  }

  showApostas(evento_id: String, evento){
    this.navCtrl.push('ApostasPage', {evento_id: evento_id, evento: evento})
  }

}
