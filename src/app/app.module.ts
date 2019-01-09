import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventoProvider } from '../providers/evento/evento';
import { HttpClientModule } from '@angular/common/http';
import { ApostasProvider } from '../providers/apostas/apostas';
import { ApostadorProvider } from '../providers/apostador/apostador';
import { StorageProvider } from '../providers/storage/storage';
import { AuthProvider } from '../providers/auth/auth';
import { AuthInterceptorProvider } from '../interceptors/auth.-interceptors';
import { Tab1 } from '../pages/perfil/component/tab1';
import { Tab2 } from '../pages/perfil/component/tab2';
import { ResultadoProvider } from '../providers/resultado/resultado';
import { AdminProvider } from '../providers/admin/admin';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { TodosEventosTab } from '../pages/evento/tabs/todosEventosTab';
import { EventosFinalizadosTab } from '../pages/evento/tabs/eventos-finalizados/eventos-finalizados';
import { EventosAtivosTab } from '../pages/evento/tabs/eventos-ativos/eventos-ativos';
import {LOCALE_ID} from '@angular/core';
import {ChartsModule} from 'ng2-charts';
import { CaixaProvider } from '../providers/caixa/caixa';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/components/common/messageservice';
import { CaptadorProvider } from '../providers/captador/captador';
import { ParametroProvider } from '../providers/parametro/parametro';





@NgModule({
  declarations: [
    MyApp,
    Tab1,
    Tab2,
    TodosEventosTab,
    EventosFinalizadosTab,
    EventosAtivosTab
    
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrMaskerModule,
    ChartsModule,
    DialogModule,
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,   
    Tab1 ,
    Tab2,
    TodosEventosTab,
    EventosFinalizadosTab,
    EventosAtivosTab,
    
    
    
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "en-US"
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventoProvider,
    ApostasProvider,
    ApostadorProvider,    
    StorageProvider,
    AuthProvider,
    AuthInterceptorProvider,
    ResultadoProvider,
    AdminProvider,
    CaixaProvider,
    MessageService,
    CaptadorProvider,
    CaptadorProvider,
    ParametroProvider
  ]
})
export class AppModule {}
