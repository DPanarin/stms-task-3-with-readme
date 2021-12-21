import { Injectable } from '@angular/core';
import {FavoriteItem} from "./favorite-item";
import {FavoriteItemType} from "./favorite-item-type.enum";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly orders = new Set<string>();
  private readonly patients = new Set<string>();

  constructor() { }

  isFavorite(item: FavoriteItem) {
    switch (item.type) {
      case FavoriteItemType.Order: {
        return this.orders.has(item.id)
      }
      case FavoriteItemType.Patient: {
        return this.patients.has(item.id)
      }
      default: {
        return false;
      }
    }
  }

  changeStatus(item: FavoriteItem) {
    switch (item.type) {
      case FavoriteItemType.Order: {
        this.isFavorite(item) ? this.orders.delete(item.id) : this.orders.add(item.id);
        return this.isFavorite(item);
      }
      case FavoriteItemType.Patient: {
        this.isFavorite(item) ? this.patients.delete(item.id) : this.patients.add(item.id);
        return this.isFavorite(item);
      }
      default: {
        return false;
      }
    }
  }

  getFavorites() {
    return this.patients;
  }
}
