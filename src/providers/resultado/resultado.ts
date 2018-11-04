import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { ResultadoDTO } from '../../models/resultado.dto';

/*
  Generated class for the ResultadoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultadoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ResultadoProvider Provider');
  }

  findResultado(evento: string):Observable<ResultadoDTO>{
    return this.http.get<ResultadoDTO>(`${API_CONFIG.baseUrl}/resultado/evento/${evento}`)
  }

}
