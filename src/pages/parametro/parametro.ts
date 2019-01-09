import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParametroProvider } from '../../providers/parametro/parametro';

/**
 * Generated class for the ParametroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parametro',
  templateUrl: 'parametro.html',
})
export class ParametroPage {
  sortear : number;
  tipoJogo : any;
  ganhar: number;
  apostar: number;
  formGroup : FormGroup;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public formBuilder : FormBuilder,
  public parametroService : ParametroProvider,
private alertCtrl : AlertController,
private loadingCtrl : LoadingController) {

      this.formGroup = formBuilder.group({
        tipoJogo: [''],
        qtdApostar: ['', [Validators.required, Validators.min(0)]],
        qtdAcertar:['', [Validators.required, Validators.min(0)]],
        totalApostar: [''],
        endPoint:[''],
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParametroPage');
  }

  cadastrarParametro(){
    if (this.formGroup.value.qtdApostar == null || this.formGroup.value.qtdAcertar == null) {
      this.showInsertError('Preencha todos os campos.');
    }
    else{
    if (this.formGroup.value.qtdApostar > 0 && this.formGroup.value.qtdApostar != null) {
      if (this.formGroup.value.qtdAcertar <= this.formGroup.value.qtdApostar && 
        this.formGroup.value.qtdAcertar > 0) {
        this.insert(this.formGroup.value.endPoint);
      }
    }
    else {
      this.insert(this.formGroup.value.endPoint);
    }
  }
    console.log(this.formGroup.value);
  }

  voltar(){
    this.navCtrl.pop();
  }

  insert(endpoint : number){
    let loading = this.loadingCtrl.create({
      content: 'Validando cadastro. Aguarde um instante.'
    });
    loading.present();
    this.totalApostar(endpoint);
    this.parametroService.insert(this.formGroup.value).subscribe(response => {
      this.showInsertOk();
      loading.dismiss();
    },
   error => {
    this.showInsertError('Falha ao realizar cadastro.');
    loading.dismiss();
   })
  }

  totalApostar(endpoint){
if (endpoint == 1) {
  this.formGroup.value.totalApostar = 60;
} else if(endpoint == 2){
  this.formGroup.value.totalApostar = 80;
}else{
  this.formGroup.value.totalApostar = 25;
}
  }

  showInsertError(msg){
    let alert = this.alertCtrl.create({
      title:'Falhou',
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


  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Parâmetro cadastrado com Sucesso',
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
