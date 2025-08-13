import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http= inject(HttpClient);

  constructor() { }

  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/home/new-products')
  }

 getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/home/featured-products')
  }

  getCategories(){
    return this.http.get<Category[]>(environment.apiUrl + '/customer/categories')
  }

   getBrands(){
    return this.http.get<Category[]>(environment.apiUrl + '/customer/brands')
  }

  getSearchProduct(searchTerm:string, categoryId:string, sortBy:string,sortOrder:number,brandId:string, page:number, pageSize:number){
    return this.http.get<Product[]>(environment.apiUrl+`/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`)
  }

  getProductById(id:string){
    return this.http.get<Product>(environment.apiUrl+'/customer/product/'+id);
  }

 
}
