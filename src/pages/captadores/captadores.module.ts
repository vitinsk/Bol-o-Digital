import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaptadoresPage } from './captadores';

@NgModule({
  declarations: [
    CaptadoresPage,
  ],
  imports: [
    IonicPageModule.forChild(CaptadoresPage),
  ],
})
export class CaptadoresPageModule {}
