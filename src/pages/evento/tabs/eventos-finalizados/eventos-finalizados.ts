import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { EventoProvider } from '../../../../providers/evento/evento';
import { STORAGE_KEYS } from '../../../../config/storage_keys.config';





@Component({
  templateUrl: 'eventos-finalizados.html',
})
export class EventosFinalizadosTab {
  msg = false;
 
  eventos: any[]; 
  constructor(public navCtrl: NavController,public service: EventoProvider) {

  }

  ionViewDidEnter(){

    if(localStorage.getItem(STORAGE_KEYS.localUser) == null){     
      this.navCtrl.setRoot('LoginPage');
      return
    }
    
    this.service.findFinalizados().subscribe(retorno => {
      this.eventos = retorno; 
      this.showMsg(this.eventos);
    })
  }

  showApostas(evento_id: String, evento){
    this.navCtrl.push('ApostasPage', {evento_id: evento_id, evento: evento})
  }

  showMsg(retorno: Array<any>){
    if(retorno.length == 0){
        this.msg = false
        console.log(this.msg)

    }else{
        this.msg = true;
        console.log(this.msg)
    }
  }

}
