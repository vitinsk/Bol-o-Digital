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



@NgModule({
  declarations: [
    MyApp
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp 
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventoProvider,
    ApostasProvider,
    ApostadorProvider,    
    StorageProvider,
    AuthProvider,
    AuthInterceptorProvider
  ]
})
export class AppModule {}
