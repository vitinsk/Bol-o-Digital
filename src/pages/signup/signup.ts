import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApostadorProvider } from '../../providers/apostador/apostador';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public menu: MenuController,
  public view: ViewController,
  public alertCtrl: AlertController,
  formBuilder : FormBuilder,
  public apostadorService: ApostadorProvider) {

    this.formGroup = formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],    
      senha: ['', [Validators.required]]  
      /*
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      telefone: ['977261827', [Validators.required]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],    
      senha: ['123', [Validators.required]]  
      */ 
     
   
    });
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }

    voltar(){
      this.view.dismiss();
    }

    cadastrarApostador(){
      this.apostadorService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
    
      },
    error => {
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
