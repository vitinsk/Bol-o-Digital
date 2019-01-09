import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Parametro } from '../../models/parametro';
import { ParametroProvider } from '../../providers/parametro/parametro';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoProvider } from '../../providers/evento/evento';

/**
 * Generated class for the CriarEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-evento',
  templateUrl: 'criar-evento.html',
})
export class CriarEventoPage {
  parametros : Parametro[];
  selectedParametro : Parametro;
  formGroup : FormGroup;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public parametroService : ParametroProvider,
    public formBuilder : FormBuilder,
  public eventoService : EventoProvider,
public loadingCtrl: LoadingController,
public alertCtrl : AlertController) {
  
      this.formGroup = formBuilder.group({
        vlrAdmin : [''],
        vlrParticipacao : [''],
        concursoIniciar : [''],
        tipoJogo : [''],
        dataInicio : ['']
      });

    }

  ionViewDidLoad() {
    this.findParametros();
  }

  cadastrarEvento(){
    let loading = this.loadingCtrl.create({
      content: 'Validando cadastro. Aguarde um instante.'
    });
    loading.present();
    this.eventoService.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk();
      loading.dismiss();
    },
  error => {
    loading.dismiss();
  })
  }

  findParametros(){
    this.parametroService.findParametros().subscribe(response => {
      this.parametros = response;
    },
   error => {

  });
  }

  selectParametro(param : Parametro){
    this.selectedParametro = param;
  }

  voltar(){
    this.navCtrl.pop();
  }

  select(param){
    console.log(param.id);
    this.selectedParametro = param;
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Evento cadastrado com Sucesso',
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
}
