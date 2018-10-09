import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { API_CONFIG } from '../../config/api.config';
import { LocalUser } from '../../models/local_user';
import {JwtHelper} from 'angular2-jwt';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  jwtHelper : JwtHelper = new JwtHelper();

  constructor(public http: HttpClient,
  public storage: StorageProvider) {
    
  }

  authenticate(cred: CredenciaisDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      cred,
      {
        observe:'response',
        responseType:'text'
      }
    );
  }

  refreshToken() {
    return this.http.post(
     `${API_CONFIG.baseUrl}/auth/refresh_token`,           
 {},
 {
     observe: 'response',
     responseType: 'text'
 });
 }

 successfulLogin(authorizationValue : string){
  let tok = authorizationValue.substring(7);
  let user : LocalUser = {
      token : tok,
      email : this.jwtHelper.decodeToken(tok).sub
  };
  this.storage.setLocalUser(user);
 
 
}

logout(){
  this.storage.setLocalUser(null); 
}

}
