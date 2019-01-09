import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostasPage } from './apostas';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { FieldsetModule } from 'primeng/fieldset';
import { ComponentsModule } from '../../components/components.module';




@NgModule({
  declarations: [
    ApostasPage,   
    
  ],

  imports: [     
    IonicPageModule.forChild(ApostasPage),    
    BrMaskerModule,
    FieldsetModule,
    ComponentsModule,    

  ],
  entryComponents: [
    
  ]
})
export class ApostasPageModule {}
