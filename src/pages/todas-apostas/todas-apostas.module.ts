import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodasApostasPage } from './todas-apostas';

import {ChartModule} from 'primeng/chart';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TodasApostasPage,
  ],
  imports: [
    IonicPageModule.forChild(TodasApostasPage),
    ChartModule,
    ComponentsModule
  ],
})
export class TodasApostasPageModule {}
