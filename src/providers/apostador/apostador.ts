import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApostadorDTO } from '../../models/apostador.dto';
import { API_CONFIG } from '../../config/api.config';

/*
  Generated class for the ApostadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApostadorProvider {

  constructor(public http: HttpClient) {
    
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/apostador?email=${email}`);
}

  insert(obj: ApostadorDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/apostador`,
      obj,
      {
        observe: 'response',
        responseType:'text'
      }
    )}

}
