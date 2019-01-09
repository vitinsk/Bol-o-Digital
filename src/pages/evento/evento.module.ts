import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoPage } from './evento';
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [
    EventoPage,
  ],
  imports: [
    DialogModule,
    IonicPageModule.forChild(EventoPage),

    
  ],
})
export class EventoPageModule {}
