import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    this.evento = this.navParams.get('evento');

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

}
