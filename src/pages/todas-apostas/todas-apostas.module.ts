import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodasApostasPage } from './todas-apostas';

@NgModule({
  declarations: [
    TodasApostasPage,
  ],
  imports: [
    IonicPageModule.forChild(TodasApostasPage),
  ],
})
export class TodasApostasPageModule {}
