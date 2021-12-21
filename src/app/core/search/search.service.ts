import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search<T>(data: T[], searchTerm: string, searchByField: string) {
    searchTerm = searchTerm.toLowerCase();

    return searchTerm
        ? data.filter((item: T) => item[searchByField].toLowerCase().includes(searchTerm))
        : data;
  }
}
