import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {FieldsetModule} from 'primeng/fieldset';
import { MessageService } from 'primeng/components/common/messageservice';


@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    ButtonModule,
    IonicPageModule.forChild(LoginPage),
    FormsModule,
    FieldsetModule,    
    
  ],
  providers:[
    MessageService
  ]
})
export class LoginPageModule {}
