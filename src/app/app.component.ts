import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { ApostadorProvider } from '../providers/apostador/apostador';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  admin = true;
  rootPage: string = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    public apostadorService: ApostadorProvider) {
    
    this.initializeApp();
 
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Apostar', component: 'EventoPage' },
      {title: 'Minha Pagina', component: 'PerfilPage'}, 
      { title: 'Logout', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
   
    });
  }

 

  openPage(page : {title: string, component: string}) {

    switch (page.title) {
            case 'Logout':
            this.auth.logout();        
            this.nav.setRoot('LoginPage');
            break;
    
      default:
        this.nav.setRoot(page.component);
        break;
    }

    
  }

  }
    //this.nav.setRoot(page.component);
  




