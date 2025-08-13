import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCardComponent, CarouselModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  customerService= inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts:Product[]=[];
  bannerImages: Product[] = [];
  chunkedImages: any[][] = [];
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe(result => {
      this.featuredProducts = result;
      this.bannerImages.push(...result);
      this.chunkedImages = this.chunkArray(this.bannerImages, 3);
    });

    this.customerService.getNewProducts().subscribe(result => {
      this.newProducts = result;
    });
    // this.wishlistService.init();
    // this.cartService.init();
}

chunkArray(arr: any[], size: number): any[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

}
