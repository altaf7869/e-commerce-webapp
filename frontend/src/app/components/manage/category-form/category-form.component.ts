import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  name!: String;
  categoryService=inject(CategoryService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  id!:string;

  ngOnInit(){
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit=true;
      this.categoryService.getCategoryById(this.id).subscribe((result:any) => {
        this.name = result.name;
      })
    }
  }

  addCategory(){
    this.categoryService.addCtegory(this.name).subscribe((result:any) => {
      alert("Category Addedd Successfully.");
      this.router.navigateByUrl("/admin/categories");
    })
  }

  updateCategory(){
    this.categoryService.updateCtegory(this.id, this.name).subscribe((result:any) => {
      alert('Category Updated Successfully.');
      this.router.navigateByUrl('/admin/categories');
    })
  }
}
