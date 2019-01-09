import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caixa } from '../../models/caixa';
import { API_CONFIG } from '../../config/api.config';

/*
  Generated class for the CaixaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CaixaProvider {

  constructor(public http: HttpClient) {
   
  }

  findByEvento(evento : string): Observable<Caixa[]> {
    return this.http.get<Caixa[]>(`${API_CONFIG.baseUrl}/caixa/${evento}`);  
  }
}
