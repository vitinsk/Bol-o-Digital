import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ResultadoProvider } from '../../providers/resultado/resultado';
import { ResultadoDTO } from '../../models/resultado.dto';

/**
 * Generated class for the ResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {
  resultado : ResultadoDTO;
  evento: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public resultadoService: ResultadoProvider) {
  }

  ionViewDidLoad() {
    let evento = this.navParams.get('evento');
    this.evento = evento;
    if(this.evento == null){
      this.navCtrl.setRoot('EventoPage')
      return null;
    }
    this.loadResultado(this.evento.id);
  }

  loadResultado(evento_id: string){
    this.resultadoService.findResultado(evento_id).subscribe(response => {
      this.resultado = response;
      console.log(response);
    })
  }

}
