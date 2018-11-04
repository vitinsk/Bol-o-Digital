import { Component } from '@angular/core';
import { ApostasProvider } from '../../../providers/apostas/apostas';
import { Aposta } from '../../../models/apostas';
import { Metodos } from '../../../utils/metodos';
import { StorageProvider } from '../../../providers/storage/storage';

@Component({
  templateUrl:'minhasApostas.html'
})
export class Tab2 {
  apostas: Aposta[];
  metodos = new Metodos;
  constructor(public apostaService: ApostasProvider, public storage: StorageProvider){
  
    

    }


    ionViewDidEnter(){
      this.buscarApostas();
    }

    buscarApostas(){
        this.apostaService.findByEmail(this.storage.getLocalUser().email).subscribe(response => {
          this.apostas = response; 
          for (let i = 0; i <response.length; i++) {
            this.apostas[i].numero_apostado = this.metodos.passaParaArray(response[i].numero_apostado.toString());  
            if (this.apostas[i].numeros_acertados) {
              this.apostas[i].numeros_acertados = this.metodos.passaParaArray(response[i].numeros_acertados.toString());  
            }
               
          }   
          
        
        })
    }
 }