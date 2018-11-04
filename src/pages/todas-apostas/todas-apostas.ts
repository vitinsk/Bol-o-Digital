import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApostasProvider } from '../../providers/apostas/apostas';
import { Aposta } from '../../models/apostas';
import { Metodos } from '../../utils/metodos';

/**
 * Generated class for the TodasApostasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todas-apostas',
  templateUrl: 'todas-apostas.html',
})
export class TodasApostasPage {

  apostas: Aposta[]; 
  metodos = new Metodos;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public apostaService: ApostasProvider,
public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    let evento_id = this.navParams.get('evento');
    console.log(evento_id)
    this.loadApostas();
   
  }

  abrirModal(dados: any) {
    let modalAposta = this.modalCtrl.create('ModalApostaPage', {dados: dados});
    modalAposta.present();
  }


  loadApostas(){
    let evento_id = this.navParams.get('evento');
    this.apostaService.findByEvento(evento_id).subscribe(response => {
      this.apostas = response; 
      for (let i = 0; i <response.length; i++) {
        this.apostas[i].numero_apostado = this.metodos.passaParaArray(response[i].numero_apostado.toString());  
        if (this.apostas[i].numeros_acertados) {
          this.apostas[i].numeros_acertados = this.metodos.passaParaArray(response[i].numeros_acertados.toString());  
        }           
      }     
    
    })
  }

}
