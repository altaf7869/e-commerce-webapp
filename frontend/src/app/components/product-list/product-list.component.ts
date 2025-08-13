import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  products: Product[] = [];
  categoryList: Category[] = [];
  brandList: Brand[] = [];

  selectedCategory: string = '';
  selectedBrand: string = '';
  searchTerm: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  page: number = 1;
  pageSize: number = 6;
  visiblePages: number[] = [];

  ngOnInit() {
    this.customerService.getCategories().subscribe(result => {
      this.categoryList = result;
    });

    this.customerService.getBrands().subscribe(result => {
      this.brandList = result;
    });

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.selectedCategory = params['categoryId'] || '';
      this.selectedBrand = params['brandId'] || '';
      this.getProducts();
    });
  }

  getProducts() {
    this.customerService.getSearchProduct(
      this.searchTerm,
      this.selectedCategory,
      this.sortBy,
      this.sortOrder,
      this.selectedBrand,
      this.page,
      this.pageSize
    ).subscribe(result => {
      this.products = result;

      // if(result.length<this.pageSize){
        
      // }
      this.isNext = result.length === this.pageSize;
      // Update visible page numbers
      this.updateVisiblePages();
    });
  }

onSortChange(event: any) {
  const value = event.target.value;
  this.sortBy = 'price';
  this.sortOrder = Number(value);
  this.getProducts();
}


  onFilterChange() {
    const queryParams: any = {};

    if (this.searchTerm) queryParams.search = this.searchTerm;
    if (this.selectedCategory) queryParams.categoryId = this.selectedCategory;
    if (this.selectedBrand) queryParams.brandId = this.selectedBrand;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  trackProduct(index: number, item: Product): any {
    return item._id;
  }


  resetFilters() {
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.onFilterChange();
  }

  isNext=true;
  pageChange(newPage: number): void {
    if (newPage < 1) return;
    this.page = newPage;
    this.getProducts();
  }

  updateVisiblePages(): void {
    const range = 2;
    let start = Math.max(1, this.page - range);
    let end = this.page + range;

    // Only push visible pages (without knowing total pages)
    this.visiblePages = [];

    for (let i = start; i <= end; i++) {
      if (i < this.page || i === this.page || this.isNext) {
        this.visiblePages.push(i);
      }
    }
  }

}
