import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController} from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';
import { Evento } from '../../models/evento';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  eventos: Evento[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public eventoService: EventoProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidEnter() {
    this.findInativo();
    console.log(this.eventos);
  }


  findInativo(){
    this.eventoService.findInativo().subscribe(response => {
      this.eventos = response;
      console.log(response);
    })
  }

  ativar(evento_id: string){
    this.eventoService.ativar(evento_id).subscribe(response => {
      this.findInativo();
      this.showInsertOk(`O evento ${evento_id} foi ativo com Sucesso!!`);
    });
  }

  sincronizar(){
    this.eventoService.sincronizar().subscribe(
      response => {
        this.showInsertOk('Sistema foi sincronizado com Sucesso!');
      },
      error => {
        this.showError("Desculpe... não foi possível realizar a conexão");
      }
    )
  }


  showInsertOk(msg: string){
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message: msg,
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


  showError(msg: string){
    let alert = this.alertCtrl.create({
      title:'Error',
      message: msg,
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
  voltar(){
    this.navCtrl.pop();
  }

  abrirModalCriarEvento() {
    let modalAposta = this.modalCtrl.create('CriarEventoPage');
    modalAposta.present();
  }
  abrirModalCriarParametro() {
    let modalAposta = this.modalCtrl.create('ParametroPage');
    modalAposta.present();
  }


  desativar(evento_id){
    this.eventoService.desativar(evento_id).subscribe(response => {
      this.findInativo();
      this.showInsertOk(`O evento ${evento_id} foi desativado com Sucesso!!`);
    });
  }

  editar(evento_id){

  }
}
