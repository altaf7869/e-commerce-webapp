import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  customerService = inject(CustomerService);
  categoryList: Category[] = [];
  authService = inject(AuthService);
  router = inject(Router);

  searchTerm: string = '';

  ngOnInit() {
    this.customerService.getCategories().subscribe(result => {
      this.categoryList = result;
      console.log(this.categoryList);
    });
  }

  onSearch() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchTerm.trim() }
      });
    }
  }

  searchCategory(id: string) {
    this.searchTerm = '';
    this.router.navigate(['/products'], {
      queryParams: { categoryId: id }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
