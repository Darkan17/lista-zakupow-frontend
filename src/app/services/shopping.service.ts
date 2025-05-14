import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShoppingItem {
  _id?: string;
  name: string;
  bought: boolean;
  store?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private apiUrl = 'http://127.0.0.1:5000/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.apiUrl);
  }

  addItem(item: ShoppingItem): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateItem(id: string, item: ShoppingItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
