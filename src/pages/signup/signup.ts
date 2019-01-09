import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApostadorProvider } from '../../providers/apostador/apostador';
import { HttpErrorResponse } from '@angular/common/http';
import { CaptadorProvider } from '../../providers/captador/captador';
import { Captador } from '../../models/captador';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  ErrorMsg: any;
  formGroup : FormGroup;
  captador : Captador[];

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public menu: MenuController,
  public view: ViewController,
  public alertCtrl: AlertController,
  formBuilder : FormBuilder,
  public apostadorService: ApostadorProvider,
  public captadorService : CaptadorProvider,
public loadingCtrl: LoadingController) {

    this.formGroup = formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      telefone: ['', [Validators.required]],
      captador:[],
      email: ['', [Validators.required, Validators.email]],    
      senha: ['', [Validators.required]]  
    });
}
  
  loadCaptador(){
    this.captadorService.findAll().subscribe(response => {
      this.captador = response;
    })
  }

  ionViewDidLoad() {
    this.loadCaptador();
   
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
  

    voltar(){
      this.view.dismiss();
    }

    cadastrarApostador(){
      let loading = this.loadingCtrl.create({
        content: 'Validando cadastro.'
      });
      loading.present();
      this.formGroup.value.email
      this.apostadorService.insert(this.formGroup.value)
      .subscribe(response => {
        loading.dismiss();
        this.showInsertOk();
    
      },
    error => {
      loading.dismiss();
      this.showError(error);
    });
    }

    showInsertOk(){
      let alert = this.alertCtrl.create({
        title:'Sucesso',
        message:'Cadastro Efetuado com Sucesso',
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
          text:'OK',
         
        }]
      });
      alert.present();
    }

    msgError(error : string){
      debugger;
      if(error.toString() == null){
        return "Ocorreu um erro inesperado."+
        " Entre em contato com o administrador, ou tente novamente mais tarde."
      }else{
      let position = error.indexOf('message');
      let positionFim = error.indexOf('path');
      let msgErro = error.substring(position + 10, positionFim - 3)
      return msgErro;
      }
    }

}
