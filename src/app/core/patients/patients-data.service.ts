import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Patient} from '../../shared/models/patient.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {
  private readonly apiUrl = `${environment.baseUrl}/51597ef3`

  constructor(private readonly httpClient: HttpClient) { }

  getPatients(params?: Params): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.apiUrl, {params: params})
  }
}
