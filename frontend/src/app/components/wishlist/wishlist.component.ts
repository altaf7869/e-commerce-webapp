import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../types/product';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlists: Product[]=[];
  wishlistService=inject(WishlistService);


  ngOnInit(){
    this.wishlistService.init();
//this.whishlists = this.wishlistService.wishlists;
  //console.log(this.whishlists, 'for test');
  }
}
