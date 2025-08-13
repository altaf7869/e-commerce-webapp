import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
formBuilder = inject(FormBuilder);
 isEdit=false;
  id!:string;

productForm = this.formBuilder.group({
  name: [null, [Validators.required, Validators.minLength(5)]],
  shortDescription: [null, [Validators.required, Validators.minLength(10)]],
  description: [null, [Validators.required, Validators.minLength(5)]],
  price: [null, [Validators.required]],
  discount: [],
  images: this.formBuilder.array([]),
  categoryId: [null, [Validators.required]],
  brandId: [null, [Validators.required]],
  isFeatured:[false],
  isNewProduct:[false]
})

productService=inject(ProductService);
categoryService=inject(CategoryService);
brandService=inject(BrandService)

brands: Brand[]=[];
categories: Category[]=[];

route=inject(ActivatedRoute);

ngOnInit(){
 
  this.categoryService.getCategories().subscribe((result) => {
    this.categories = result;
  })

  this.brandService.getBrands().subscribe((result) => {
    this.brands = result;
  });

  this.id=this.route.snapshot.params["id"];
  if(this.id){
    this.isEdit = true;
    this.productService.getProductById(this.id).subscribe(result => {
      for(let index = 0; index < result.images.length; index++){
        this.addImage();
      }
      this.productForm.patchValue(result as any);
    })
  }else {
     this.addImage();
  }
}

router=inject(Router);

  addProduct(){
    let value = this.productForm.value;

    this.productService.addProduct(value as any).subscribe((result) => {
      alert('Product Added');
      this.router.navigateByUrl("/admin/products");
    })
  }

updateProduct() {
  const value = this.productForm.value;

  this.productService.updateProduct(this.id, value).subscribe({
    next: () => {
      alert('Product Updated');
      this.router.navigateByUrl("/admin/products");
    },
    error: (err) => {
      console.error('Update failed', err);
      alert('Failed to update product.');
    }
  });
}


  addImage(){
    this.images.push(this.formBuilder.control(null))
  }

  removeImage(){
    this.images.removeAt(this.images.controls.length-1);
  }

  get images(){
    return this.productForm.get('images') as FormArray;
  }

}
