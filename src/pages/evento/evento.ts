import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { TodosEventosTab } from './tabs/todosEventosTab';
import { EventosFinalizadosTab } from './tabs/eventos-finalizados/eventos-finalizados';
import { EventosAtivosTab } from './tabs/eventos-ativos/eventos-ativos';



@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  data: any;
  eventos: any[];
  todosEventosTab: any;
  eventosFinalizadosTab: any;
  eventosAtivosTab: any;
  constructor(public navCtrl: NavController,public service: EventoProvider) {
this.todosEventosTab = TodosEventosTab;
this.eventosFinalizadosTab = EventosFinalizadosTab;
this.eventosAtivosTab = EventosAtivosTab;


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
