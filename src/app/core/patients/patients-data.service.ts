import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientsDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getPatients(params?: Params) {
    return this.httpClient.get()
  }
}
