import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receita } from '../../models/receita';
import { API_CONFIG } from '../../config/api.config';

/*
  Generated class for the AdminProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdminProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AdminProvider Provider');
  }

  findReceita(): Observable<Receita>{
    return this.http.get<Receita>(`${API_CONFIG.baseUrl}/admin/receita`);
  }

}
