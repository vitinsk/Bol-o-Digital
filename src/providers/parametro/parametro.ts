import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parametro } from '../../models/parametro';
import { API_CONFIG } from '../../config/api.config';

/*
  Generated class for the ParametroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParametroProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ParametroProvider Provider');
  }

  findParametros():Observable<Parametro[]>{
    return this.http.get<Parametro[]>(`${API_CONFIG.baseUrl}/jogo-parametro`);
  }

  insert(obj: Parametro){
    return this.http.post(
      `${API_CONFIG.baseUrl}/jogo-parametro`,
      obj,
      {
        observe: 'response',
        responseType:'text'
      }
    )}

}
