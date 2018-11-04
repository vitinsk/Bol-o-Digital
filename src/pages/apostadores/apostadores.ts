import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApostadorProvider } from '../../providers/apostador/apostador';
import { ApostadorDTO } from '../../models/apostador.dto';


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
  apostador: ApostadorDTO;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apostadorService: ApostadorProvider,
  public alertCtrl: AlertController) {
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
              
            })
          }
        }
      ]
    });
    alert.present();
  }
   
  

  findAll(){
    this.apostadorService.findAll().subscribe(response => {
      this.apostador = response;
    });
  }

}
