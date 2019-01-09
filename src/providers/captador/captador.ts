import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { Captador } from '../../models/captador';

/*
  Generated class for the CaptadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CaptadorProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CaptadorProvider Provider');
  }
  findAll() : Observable<Captador[]>{
    return this.http.get<Captador[]>(`${API_CONFIG.baseUrl}/captador`)
  }

  addCaptador(obj: Captador){
    return this.http.post(
      `${API_CONFIG.baseUrl}/captador`,
      obj,
      {
        observe: 'response',
        responseType:'text'
      }
    )}

    adicionar(captador){
      return this.http.post(`${API_CONFIG.baseUrl}/captador`,captador)
    }

}
