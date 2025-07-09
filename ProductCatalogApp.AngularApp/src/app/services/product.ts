// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductViewModel } from '../models/product-view-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductViewModel[]> {
    return this.http.get<ProductViewModel[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<ProductViewModel> {
    return this.http.get<ProductViewModel>(`${this.apiUrl}/${id}`);
  }

 
  createProduct(product: ProductViewModel): Observable<ProductViewModel> {
    return this.http.post<ProductViewModel>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductViewModel): Observable<ProductViewModel> { 
    return this.http.put<ProductViewModel>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
