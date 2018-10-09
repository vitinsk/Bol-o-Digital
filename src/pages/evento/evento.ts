import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';
import { STORAGE_KEYS } from '../../config/storage_keys.config';


@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

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
      console.log(this.eventos);
    })
  }

  showApostas(evento_id: String){
    this.navCtrl.push('ApostasPage', {evento_id: evento_id})
  }

}
