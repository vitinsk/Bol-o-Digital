import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Aposta } from '../../models/apostas';

/**
 * Generated class for the ListaApostaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lista-aposta',
  templateUrl: 'lista-aposta.html'
})
export class ListaApostaComponent {
  @Input() listaApostas : Aposta[];
  apostas : Aposta[];

  constructor(public modalCtrl : ModalController) {
    

  }

  abrirModal(dados: any) {
    let modalAposta = this.modalCtrl.create('ModalApostaPage', {dados: dados});
    modalAposta.present();
    console.log(dados)
  }

  ngOnInit() {
    this.apostas = this.listaApostas;
}

}
