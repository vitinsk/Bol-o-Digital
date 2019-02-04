import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Aposta } from '../../models/apostas';
import { Apostar } from '../../models/apostar';

/*
  Generated class for the ApostasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApostasProvider {

  constructor(public http: HttpClient) {}

  findByEvento(id_evento: String): Observable<Aposta[]>{
    return this.http.get<Aposta[]>(`${API_CONFIG.baseUrl}/aposta/evento/${id_evento}`)
  }

  findByEmail(email: String): Observable<Aposta[]>{
    return this.http.get<Aposta[]>(`${API_CONFIG.baseUrl}/aposta/apostador/${email}`)
  }

  findByEmailAndEvento(email, id_evento): Observable<Aposta[]>{

    let params = new HttpParams();
    params.set("email", email);
    params.set("evento_id", id_evento);

    return this.http.get<Aposta[]>(`${API_CONFIG.baseUrl}/aposta/apostador/evento?email=${email}&evento_id=${id_evento}`)
  }

  save(aposta: Apostar){
    return this.http.post(
      `${API_CONFIG.baseUrl}/aposta/salvar`,
      aposta,{
        observe:'response',
        responseType:'text'
      });
     
  }



  gerarRelatorio(evento){
    return this.http.get(
      `${API_CONFIG.baseUrl}/relatorios/eventos/${evento}`);
     
  }
}
