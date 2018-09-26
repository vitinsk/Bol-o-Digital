import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventoProvider } from '../providers/evento/evento';
import { HttpClientModule } from '@angular/common/http';
import { ApostasProvider } from '../providers/apostas/apostas';
import { ModalApostaPage } from '../pages/modal-aposta/modal-aposta';
import { CadastroApostaPage } from '../pages/cadastro-aposta/cadastro-aposta';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ModalApostaPage,
    CadastroApostaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,   
    ModalApostaPage,
    CadastroApostaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventoProvider,
    ApostasProvider
  ]
})
export class AppModule {}
