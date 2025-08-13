import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 http=inject(HttpClient);

  constructor() { }

  getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/product");
  }

  getProductById(id:String){
    return this.http.get<Product>('http://localhost:3000/product/' + id);
  }

  addProduct(product: any) {
    return this.http.post("http://localhost:3000/product", product);
  }

// ✅ Correct
updateProduct(id: string, product: any) {
  return this.http.put(`http://localhost:3000/product/${id}`, product);
}


   deleteProductById(id:String){
    return this.http.delete('http://localhost:3000/product/' + id);
  }
}
