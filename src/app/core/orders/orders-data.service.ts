import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from '../../shared/models/order.model';
import {pluck} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersDataService {
  private readonly apiUrl = `${environment.baseUrl}/79fb05cb`

  constructor(private readonly httpClient: HttpClient) { }

  getOrders(params?: Params): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl, {params: params}).pipe(pluck('order'));
  }
}
