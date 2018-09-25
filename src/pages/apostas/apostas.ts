import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { ApostasProvider } from '../../providers/apostas/apostas';
import { EventoProvider } from '../../providers/evento/evento';
import { ModalApostaPage } from '../modal-aposta/modal-aposta';
import { Aposta } from '../../models/apostas';
import { Metodos } from '../../utils/metodos';

@IonicPage()
@Component({
  selector: 'page-apostas',
  templateUrl: 'apostas.html',
})
export class ApostasPage {
  apostas: Aposta[]; 
  evento: any;
  num = [];

  metodos = new Metodos;
 
  teste = [1,2,3,4,5,6];

 

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public apostaService: ApostasProvider,
      public eventoService: EventoProvider,
      public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    
    this.loadApostas();
    this.loadEventoInfo();

  
  }

  loadApostas(){
    let evento_id = this.navParams.get('evento_id');
    this.apostaService.findByEvento(evento_id).subscribe(response => {
      this.apostas = response; 
      for (let i = 0; i <response.length; i++) {
        this.apostas[i].numero_apostado = this.metodos.passaParaArray(response[i].numero_apostado.toString());  
        if (this.apostas[i].numeros_acertados) {
          this.apostas[i].numeros_acertados = this.metodos.passaParaArray(response[i].numeros_acertados.toString());  
        }
           
      }   
      
      console.log(this.apostas);
    })
  }

  loadEventoInfo(){
    let evento_id = this.navParams.get('evento_id');
    this.eventoService.findById(evento_id).subscribe(response => {
      this.evento = response
    })
  }

  abrirModal(dados: any) {
    let modalAposta = this.modalCtrl.create(ModalApostaPage, {dados: dados});
    modalAposta.present();
  }



  

}
