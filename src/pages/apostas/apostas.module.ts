import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostasPage } from './apostas';


@NgModule({
  declarations: [
    ApostasPage,   
    
  ],

  imports: [     
    IonicPageModule.forChild(ApostasPage),
  ],
  entryComponents: [
    
  ]
})
export class ApostasPageModule {}
