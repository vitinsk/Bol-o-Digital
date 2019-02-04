import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController} from 'ionic-angular';
import { ApostasProvider } from '../../providers/apostas/apostas';
import { EventoProvider } from '../../providers/evento/evento';
import { Aposta } from '../../models/apostas';
import { Metodos } from '../../utils/metodos';
import { BrMaskerIonicServices3 } from 'brmasker-ionic-3';
import { ApostadorProvider } from '../../providers/apostador/apostador';
import { ApostadorDTO } from '../../models/apostador.dto';
import { StorageProvider } from '../../providers/storage/storage';
import { CaixaProvider } from '../../providers/caixa/caixa';
import { Caixa } from '../../models/caixa';
import { Evento } from '../../models/evento';


@IonicPage()

@Component({
  selector: 'page-apostas',
  templateUrl: 'apostas.html',
})
export class ApostasPage {
 
  apostas: Aposta[]; 
  caixa : Caixa[];
  apostador: ApostadorDTO;
  evento: any;
  num = [];
  botao = false;
  ganhadorOn = false;
  btn_apostar = false;
  txt_btn_apostar = false;
  txt_msg_apostar : string;
  ab = 12681308690;
  proximoConcurso: Date;

  numerosLoteria = [];


  metodos = new Metodos;

  constructor(public navCtrl: NavController,    
     public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public apostaService: ApostasProvider,
      public eventoService: EventoProvider,
      public apostadorService: ApostadorProvider,
      public caixaService: CaixaProvider,
      public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public storage: StorageProvider,
    public brMasker: BrMaskerIonicServices3) {

  }

  ionViewDidEnter(){
    let evento_id = this.navParams.get('evento_id');
    let event = this.navParams.get("evento");
    if(evento_id == null){
      this.navCtrl.setRoot('EventoPage')
      return null;
    }
    // variavel criada para não considerar o retorno da formatação dos valores dos campos do evento!
    this.evento = event;
    this.loadApostas();
    this.loadApostador(event); 
    this.loadEventoInfo(); 
    this.proximoConcurso = null;
    this.loadCaixa();
    
  }

  loadApostador(evento){    
    this.apostadorService.findByEmailApostador(this.storage.getLocalUser().email).subscribe(response => {
      this.apostador = response;
      this.botaoRealizarAposta(this.apostador, evento);
    })
  }

  botaoRealizarAposta(apostador: ApostadorDTO, evento){

    if (apostador.saldo < evento.vlrParticipacao) {
      this.btn_apostar = false;
      this.txt_btn_apostar = true;
      this.txt_msg_apostar = "Saldo insuficiente para realizar apostas!"
    }
    if(evento.status != "INATIVO"){
      this.txt_btn_apostar = false;
      this.txt_msg_apostar = "Não é mais possível apostar.."
    }
    if(evento.status == "INATIVO" && apostador.saldo >= evento.vlrParticipacao) {  
     this.btn_apostar = true;
      this.txt_btn_apostar = false;
  }
  }

  loadCaixa(){
    let evento_id = this.navParams.get('evento_id');
    this.caixaService.findByEvento(evento_id).subscribe(response => {
      this.caixa = response;
      for (let i = 0; i <response.length; i++) {
        this.caixa[i].resultado = this.metodos.passaParaArray(response[i].resultado.toString());   
     
      };  
      if (response.length > 0) {
        this.proximoConcurso = this.caixa[this.caixa.length - 1].dataProximoConcurso;
      }
      
      }
    );
    }
  

  loadApostas(){
    let evento_id = this.navParams.get('evento_id');
    this.apostaService.findByEmailAndEvento(this.storage.getLocalUser().email, evento_id).subscribe(response => {
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
      this.loadResultado(this.evento)
 /*      this.evento.vlrLiquido = this.valor(this.evento.vlrLiquido);
      this.evento.vlrParticipacao = this.valor(this.evento.vlrParticipacao);  */
    })
  }
  


  abrirModal(dados: any) {
    let modalAposta = this.modalCtrl.create('ModalApostaPage', {dados: dados});
    modalAposta.present();
  }

  mostrarBotao(evento){ 
    if(evento.status != "INATIVO"){      
      this.botao = false;
    }
    else{
      this.botao = true;
    }
  }
  
  mostrarResultado(evento){
    this.navCtrl.push('ResultadoPage', {evento: evento});
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
      closeButtonText: 'Sair',
      

    });
    toast.present();
  }


  loadResultado(evento){
    if(evento.status == "FINALIZADO"){
      this.ganhadorOn = true;
    }
    else{
      this.ganhadorOn = false;
    }
  }

  valor(valor){
    return "R$ "+ valor+",00";
  }

  todasApostas(evento: Evento){
    this.navCtrl.push('TodasApostasPage', {evento: evento})
  }


}




  


