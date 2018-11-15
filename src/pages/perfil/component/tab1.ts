import { Component } from '@angular/core';
import { ApostadorProvider } from '../../../providers/apostador/apostador';
import { ApostadorDTO } from '../../../models/apostador.dto';
import { StorageProvider } from '../../../providers/storage/storage';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  templateUrl:'perfilApostador.html'
  
})
export class Tab1 { 
administrador = false;
    apostador: ApostadorDTO;
    constructor(public apostadorService: ApostadorProvider, public storage: StorageProvider, public navCtrl: NavController,
        public modalCtrl: ModalController){
       
       
    }
    ionViewDidEnter(){
        this.loadApostador();
    }

    loadApostador(){
        this.apostadorService.findByEmailApostador(this.storage.getLocalUser().email).subscribe(
            response => {
                this.apostador = response;
                console.log(response)
                this.perfilAdmin(response.perfis);
            
            }
        )
    }


    administrar(){
        //this.navCtrl.push('AdminPage');
        let modalAdmin = this.modalCtrl.create('AdminPage');
        modalAdmin.present();
      }

      
    apostadores(){
       // this.navCtrl.push('ApostadoresPage');
        let modalApostadores = this.modalCtrl.create('ApostadoresPage');
        modalApostadores.present();
      }

    relatorio(){
        let relatorios = this.modalCtrl.create('EstatisticaPage');
        relatorios.present();
        
    }

      


      perfilAdmin(perfil){
          console.log(perfil)
          for(let i=0; i<perfil.length; i++)
            if (perfil[i] == "ADMIN") {
                this.administrador = true;
            }
      }
  
}