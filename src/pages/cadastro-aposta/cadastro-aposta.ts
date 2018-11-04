import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
import { ApostadorProvider } from '../../providers/apostador/apostador';
import { Apostar } from '../../models/apostar';
import { ApostasProvider } from '../../providers/apostas/apostas';
import { HttpErrorResponse } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-cadastro-aposta',
  templateUrl: 'cadastro-aposta.html',
})

export class CadastroApostaPage {
  element: HTMLElement;
  evento;
  classe = "";
  numeroString: string;
  numeros = [];
  selecionado = [];
  botaoApostar = false;
  Apostar = new Apostar;

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public view: ViewController,
     public apostadorService: ApostadorProvider,
    public apostaService: ApostasProvider,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
   
    
    this.evento = this.navParams.get('evento');
    if(this.evento == null){
      this.navCtrl.setRoot('EventoPage')
      return null;
    }
    this.geradorDeNumeros();
  }

  selecionarNumero(numero) {
    
    if (this.selecionado.length < 6) {
      this.mudaCorNumero(numero);

      if (this.selecionado.indexOf(numero) != -1) {     
        this.removerPorIndice(numero);
        this.numeroString = this.selecionado.join('-');
      } else {
        this.selecionado.push(numero);
        this.selecionado.sort((a, b) => a - b);
        this.numeroString = this.selecionado.join('-');
      }

      this.selecionado.sort((a, b) => a - b);
      this.numeroString = this.selecionado.join('-');
    } else {
      const a = document.getElementById(numero);
      if (this.selecionado.length == 6 && a.className == "vermelho") {
        this.mudaCorNumero(numero);
      }
      this.removerPorIndice(numero);
      this.numeroString = this.selecionado.join('-');


    }
    this.mostrarBotaoApostar(this.selecionado);
  }
  removerPorIndice(numero) {
    if (this.selecionado.indexOf(numero) != -1) {

      this.selecionado.splice(this.selecionado.indexOf(numero), 1);
    }
  }

  mudaCorNumero(id) {
    this.element = document.getElementById(id);

    if (this.element.className == 'vermelho') {
      this.element.className = 'preto';
    } else {
      this.element.className = 'vermelho'
    }

  }

  geradorDeNumeros() {
    for (let i = 1; i <= 60; i++) {
      if (i <= 9) {
        this.numeros.push('0' + i);
      } else {
        this.numeros.push(i.toString());
      }
    }

  }

  voltar() {
    this.view.dismiss();
  }


  mostrarBotaoApostar(dados){
    if(dados.length == 6){
      this.botaoApostar = true;
    }else{
      this.botaoApostar = false;
    }
  }


  cadastrarAposta(){
    let loading = this.loadingCtrl.create({
      content: 'Validando aposta. Aguarde um instante.'
    });
    loading.present();
 
    this.apostaService.save(this.Apostar);
    
    this.apostadorService.findByEmail(this.pegarEmail()).subscribe(response => {
      let apostinha : Apostar = {
        apostador_id: response['id'].toString(),
        numeros_apostados: this.numeroString,
        evento_id: this.evento.id.toString()
      }

      this.apostaService.save(apostinha).subscribe(
        response => {
           
   
          loading.dismiss();
          this.showInsertOk();
        },
        error =>{
          
          this.showError(error);
        }
        
      );
      
    });
    
    

  }

  pegarEmail(){
    let localU = localStorage.getItem("localUser");
    let posicao = localU.lastIndexOf(':');
    return localU.substring(posicao + 2, localU.length - 2);
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Aposta Efetuada com Sucesso',
      enableBackdropDismiss: false,
      buttons:[{
        text:'OK',
        handler:() => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

  showError(error: HttpErrorResponse){
    let alert = this.alertCtrl.create({
      title:'Error',
      message: this.msgError(error.error),
      enableBackdropDismiss: false,
      buttons:[{
        text:'Sair',
        handler:() => {
          this.navCtrl.pop();
        }
       
      }]
    });
    alert.present();
  }

  msgError(error : string){
    let position = error.lastIndexOf('message');
    let positionFim = error.indexOf('path');
    let msgErro = error.substring(position + 10, positionFim - 3)
    return msgErro;
  }


  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      content: 'Validando aposta. Aguarde um instante.'
    });
  
    loading.present();
  
   
      loading.dismiss();
  
  }
  

}
