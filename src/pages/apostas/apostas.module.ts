import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostasPage } from './apostas';
import { BrMaskerModule } from 'brmasker-ionic-3';


@NgModule({
  declarations: [
    ApostasPage,   
    
  ],

  imports: [     
    IonicPageModule.forChild(ApostasPage),
    BrMaskerModule
  ],
  entryComponents: [
    
  ]
})
export class ApostasPageModule {}
