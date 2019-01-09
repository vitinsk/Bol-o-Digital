import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApostadorProvider } from '../../providers/apostador/apostador';
import { ApostadorDTO } from '../../models/apostador.dto';
import { WhatsMsg } from '../../utils/whatsapp/whatsappMsg';
import { Captador } from '../../models/captador';
import { CaptadorProvider } from '../../providers/captador/captador';


/**
 * Generated class for the ApostadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apostadores',
  templateUrl: 'apostadores.html',
})
export class ApostadoresPage {
  apostador: ApostadorDTO[];
  captador = new Captador;
  whats = new WhatsMsg;
  items: ApostadorDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public apostadorService: ApostadorProvider,
     public captadorService : CaptadorProvider,
     public alertCtrl: AlertController) 
     {  }
 

  mostrar(nome: string, telefone : string){
    let url = this.whats.enviarMsg(telefone, this.whats.recebimentoCredito(nome));
    return url;
  }

  ionViewDidEnter() {
   this.findAll();
  
  }

  voltar(){
    this.navCtrl.pop();
  }

  
  addSaldo(apostador: ApostadorDTO) {
    let alert = this.alertCtrl.create({
      title: 'Adicionar Crédito',
      inputs: [
        {
          name: 'valor',
          placeholder: 'R$ 00,00',
          type: 'number'
         
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
            this.confirmacao(data.valor, apostador);
            }
        }
      ]
    });
    alert.present();
   
  }

  confirmacao(saldo, apostador) {
    let alert = this.alertCtrl.create({
      title: 'Confirmação de crédito!',
      message: `Tem certeza que deseja adicionar R$${saldo} de crédito ao apostador ${apostador.nome}` ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.apostadorService.addSaldo(apostador.email, saldo).subscribe(response => {
              this.findAll();
            })
          }
        }
      ]
    });
    alert.present();
  }

  addCaptador(apostador : ApostadorDTO) {
    let alert = this.alertCtrl.create({
      title: 'Novo Captador!',
      message: `Deseja adicionar ${apostador.nome} como um captador?` ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
           this.addComissao(apostador);
          }
        }
      ]
    });
    alert.present();
  }


  addComissao(apostador: ApostadorDTO) {
    let alert = this.alertCtrl.create({
      title: 'Adicionar Comissão',
      inputs: [
        {
          name: 'valor',
          placeholder: '00%',
          type: 'number',
                           
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          
          }
        },
        {
          text: 'Adicionar',
          handler: data => {
            this.adicionarCaptador(apostador, data.valor);
            }
        }
      ]
    });
    alert.present();
   
  }

  adicionarCaptador(apostador, comissao){  
    if (comissao <= 100) {      
      this.captador.email = apostador.email;
      this.captador.comissao = comissao;
      this.captadorService.adicionar(this.captador).subscribe(response => {

      },
    error => {     
      let alert = this.alertCtrl.create({
        title: 'Erro',
        message: error.error.message,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: data => {
            
            }
          },

        ]
      });
      alert.present();
       
      });
    };
  };
    
 
  
   
  

  findAll(){
    this.apostadorService.findAll().subscribe(response => {
      this.apostador = response;
      this.items = response;
     
    });
  }


  getItems(ev: any) {
    this.apostador = this.items;
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.apostador = this.items.filter((apostadorItem) => {
        return (apostadorItem.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
 

  }

}
