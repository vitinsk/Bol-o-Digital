import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { ApostasProvider } from '../../providers/apostas/apostas';
import { Aposta } from '../../models/apostas';
import { Metodos } from '../../utils/metodos';
import { Evento } from '../../models/evento';
import { API_CONFIG } from '../../config/api.config';
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
  valor = [];
  apostas: Aposta[]; 
  metodos = new Metodos;
  data: any;
  labelDinamica = [];
  corDinamica = [];
  evento: any;
  urlPdf : string;
  mostrarPdf = false;

  coresGrafico = ["#C0C0C0",
  "#696969",
  "#00BFFF",
  "#90EE90",  
  "#00FF00",
  "#006400",
  "#FF0000",
  "#FF00FF",
  "#DAA520",
  "#FF4500",
  "#FF8C00",
  "#FFFF00",
  "#B0E0E6",
  "#B8860B",
  "#7CFC00",];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public apostaService: ApostasProvider,
    public modalCtrl: ModalController,
   
   ) {

      
  
}

 

  

distribuirVariaveisGrafico(evento : Evento){
  for(let i=0; i<=evento.tipoJogo.qtdAcertar; i++){
    this.labelDinamica.push(`${i}`);
    this.corDinamica.push(this.coresGrafico[i]);
  }
}

montarGrafico(evento : Evento){  
  this.distribuirVariaveisGrafico(evento);
  this.data = {
    labels: this.labelDinamica,
    datasets: [
        {
            data: this.valor,
            backgroundColor: this.corDinamica,
            hoverBackgroundColor: this.corDinamica
        }]    
    };  
}


  ionViewDidEnter() {
    
    let evento = this.navParams.get('evento');
    if(evento == null){
      this.navCtrl.setRoot('EventoPage')
      return null;
    }
    
    this.evento = evento;
    console.log(evento)
    this.loadApostas();
    this.urlPdf = `${API_CONFIG.baseUrl}/relatorios/eventos/${evento.id}`
    this.exibirPDF(evento);

   
  }

 

  abrirModal(dados: any) {
    let modalAposta = this.modalCtrl.create('ModalApostaPage', {dados: dados});
    modalAposta.present();
  }

  montarGraficoDinamico(apostas : Array<Aposta>, evento : Evento){
    for(let j = 0; j <= evento.tipoJogo.qtdAcertar; j++){
      this.valor.push(0);
    }

    for(let i = 0; i < apostas.length; i++){
      for(let j = 0; j <= evento.tipoJogo.qtdAcertar; j++){
        switch (apostas[i].acertos){
          case j : this.valor[j]++;
        }
      }
    }
  }



  loadApostas(){
    let evento = this.navParams.get('evento');    
    this.apostaService.findByEvento(evento.id).subscribe(response => {
      this.apostas = response;
      this.montarGraficoDinamico(this.apostas, evento);
      this.montarGrafico(evento); 
      console.log(this.valor);
      
      console.log("DINAMICO")
      console.log(this.valor);
      for (let i = 0; i <response.length; i++) {
        this.apostas[i].numero_apostado = this.metodos.passaParaArray(response[i].numero_apostado.toString());  
        if (this.apostas[i].numeros_acertados) {
          this.apostas[i].numeros_acertados = this.metodos.passaParaArray(response[i].numeros_acertados.toString());  
        }           
      }     
    
    })


  }

  exibirPDF(evento){
    if(evento.status == 'ATIVO' || evento.status == 'FINALIZADO'){
      console.log("teste");
      this.mostrarPdf = true;
    }
    else{
      this.mostrarPdf = false;
    }
  }

  gerarRelatorio(evento){
    console.log(evento);
    this.apostaService.gerarRelatorio(evento.id).subscribe(response => {
    
    },
    error => {

    })
  }






}
