import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApostadorDTO } from '../../models/apostador.dto';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';

/*
  Generated class for the ApostadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApostadorProvider {

  constructor(public http: HttpClient) {
    
  }

  findAll() : Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/apostador/admin`)
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/apostador?email=${email}`);
}
findByEmailApostador(email: string): Observable<ApostadorDTO> {
  return this.http.get<ApostadorDTO>(`${API_CONFIG.baseUrl}/apostador?email=${email}`);
}

addSaldo(email: string, saldo: string): Observable<any>{

   let identificador = new HttpParams().set('email', email);
   let credito = new HttpParams().set('saldo', saldo);

    return this.http.put(`${API_CONFIG.baseUrl}/admin/saldo?${identificador}&${credito}`,
    {
      observe: 'response',
      responseType:'text'
    }
  )
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
