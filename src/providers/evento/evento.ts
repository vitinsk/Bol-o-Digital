import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class EventoProvider {

  constructor(public http: HttpClient) {
  }

  findAll() : Observable<any[]>{
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/evento`);
  }

  findById(evento_id: String): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.baseUrl}/evento/${evento_id}`)
  }

}
