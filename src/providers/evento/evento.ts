import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from '../../config/api.config';
import { Evento } from '../../models/evento';

@Injectable()
export class EventoProvider {

  constructor(public http: HttpClient) {
  }

  insert(obj: Evento){
    return this.http.post(
      `${API_CONFIG.baseUrl}/evento`,
      obj,
      {
        observe: 'response',
        responseType:'text'
      }
    )}

  findAll() : Observable<any[]>{
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/evento`);
  }

  findById(evento_id: String): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/evento/${evento_id}`)
  }

  findInativo(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${API_CONFIG.baseUrl}/evento/inativo`)
  }

  ativar(evento_id: string): Observable<any>{
    return this.http.put(`${API_CONFIG.baseUrl}/evento/ativar/${evento_id}`,
    evento_id)
  }

  desativar(evento_id: string): Observable<any>{
    return this.http.put(`${API_CONFIG.baseUrl}/evento/desativar/${evento_id}`,
    evento_id)
  }

  sincronizar(): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/sincronizar`)
  }

  findEmAndamento(): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/evento/em-andamento`)
  }

  findFinalizados(): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/evento/finalizados`)
  }
  

}
