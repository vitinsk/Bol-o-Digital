import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController} from 'ionic-angular';
import { ApostasProvider } from '../../providers/apostas/apostas';
import { EventoProvider } from '../../providers/evento/evento';
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
  botao = false;
  ganhadorOn = true;

  metodos = new Metodos;

  constructor(public navCtrl: NavController,    
     public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public apostaService: ApostasProvider,
      public eventoService: EventoProvider,
      public modalCtrl: ModalController,
    public toastCtrl: ToastController) {
  }

 /* ionViewDidLoad() {    
    this.loadApostas();
    this.loadEventoInfo();    
  }*/
  ionViewDidEnter(){
    this.loadApostas();
    this.loadEventoInfo();
    let evento_id = this.navParams.get('evento_id');
    if(evento_id == null){
      this.navCtrl.setRoot('EventoPage')
      return null;
    }
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
      
    
    })
  }

  loadEventoInfo(){
    let evento_id = this.navParams.get('evento_id');
    this.eventoService.findById(evento_id).subscribe(response => {
      this.evento = response
      this.mostrarBotao(this.evento);
    })
  }

  abrirModal(dados: any) {
    let modalAposta = this.modalCtrl.create('ModalApostaPage', {dados: dados});
    modalAposta.present();
  }

  mostrarBotao(evento){ 
    console.log(evento.status)
    console.log(evento.status)
    if(evento.status != "INATIVO"){      
      this.botao = false;
    }
    else{
      this.botao = true;
    }
  }

  cadastroAposta(evento_id: String){
    this.navCtrl.push('CadastroApostaPage', {evento: evento_id})
  }


  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Email enviado com sucesso!',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Sair'
    });
    toast.present();
  }
}




  


