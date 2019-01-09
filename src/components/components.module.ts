import { ListaApostaComponent } from './lista-aposta/lista-aposta';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [ListaApostaComponent],
	imports: [

		IonicPageModule,
		CommonModule
		
	],
	entryComponents:[
		
	],
	exports: [ListaApostaComponent]
})
export class ComponentsModule {}
