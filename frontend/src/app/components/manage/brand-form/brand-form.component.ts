import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent {
name!: String;
  brandService=inject(BrandService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  id!:string;

  ngOnInit(){
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit=true;
      this.brandService.getBrandById(this.id).subscribe((result:any) => {
        this.name = result.name;
      })
    }
  }

  addBrand(){
    this.brandService.addBrand(this.name).subscribe((result:any) => {
      alert("Brand Addedd Successfully.");
      this.router.navigateByUrl("/admin/brands");
    })
  }

  updateBrand(){
    this.brandService.updateBrand(this.id, this.name).subscribe((result:any) => {
      alert('Brand Updated Successfully.');
      this.router.navigateByUrl('/admin/brands');
    })
  }
}
