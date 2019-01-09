import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
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
  valor = [0,0,0,0,0,0];
  apostas: Aposta[]; 
  metodos = new Metodos;
  data: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public apostaService: ApostasProvider,
public modalCtrl: ModalController) {
  
}


montarGrafico(){  
  this.data = {
    labels: ['5','4','3','2','1','0'],
    datasets: [
        {
            data: [this.valor[0],this.valor[1],this.valor[2],this.valor[3],this.valor[4],this.valor[5]],
            backgroundColor: [
              "#008000",
              "#00FF00",
              "#00BFFF",  
              "#FFD700",
              "#FF0000"

            ],
            hoverBackgroundColor: [
              "#008000",
              "#00FF00",
              "#00BFFF",  
              "#FFD700",
              "#FF0000"
            ]
        }]    
    };  
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

  gerarGrafico(apostas : Array<Aposta>){
    debugger;
    for (let index = 0; index < apostas.length; index++) {
      switch (apostas[index].acertos) {
        case 5:  this.valor[0]++;
        break;
        case 4:  this.valor[1]++;
        break;
        case 3:  this.valor[2]++;
        break;
        case 2:  this.valor[3]++;
        break;
        case 1:  this.valor[4]++;
        break;
        case 0:  this.valor[5]++; 
        break;
        default:
          break;
      };      
    };
    console.log(this.valor);

  }

 


  loadApostas(){
    let evento_id = this.navParams.get('evento');
    this.apostaService.findByEvento(evento_id).subscribe(response => {
      this.apostas = response;
      this.gerarGrafico(this.apostas);
      this.montarGrafico(); 
      console.log(this.valor);
      for (let i = 0; i <response.length; i++) {
        this.apostas[i].numero_apostado = this.metodos.passaParaArray(response[i].numero_apostado.toString());  
        if (this.apostas[i].numeros_acertados) {
          this.apostas[i].numeros_acertados = this.metodos.passaParaArray(response[i].numeros_acertados.toString());  
        }           
      }     
    
    })
  }

}
