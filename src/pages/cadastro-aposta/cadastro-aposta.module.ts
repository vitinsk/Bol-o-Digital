import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroApostaPage } from './cadastro-aposta';

@NgModule({
  declarations: [
    CadastroApostaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroApostaPage),
  ],
})
export class CadastroApostaPageModule {}
