import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!:Product;
  @Input() priceColor = 'text-success';
  wishlistService = inject(WishlistService);
 hover: boolean = false;

  onMouseEnter() {
    this.hover = true;
  }

  onMouseLeave() {
    this.hover = false;
  }
  get sellingPrice(){
    return Math.round(
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  addToWishlist(product:Product){
    if(this.isInWishlist(product)){
      this.wishlistService.removeFromWishlists(product._id!).subscribe((result) => {
        this.wishlistService.init();
      })
    } else {
       this.wishlistService.addInWishlist(product._id!).subscribe((result) => {
        this.wishlistService.init();
      })
    }
  }

  isInWishlist(product: Product){
    let isExists = this.wishlistService.wishlists.find(
      (x) => x._id == product._id
    );
    if(isExists) return true;
    else return false; 
     // return this.wishlistService.wishlists.some(x => x._id === product._id);
  }

  cartService = inject(CartService);

  addToCart(product:Product){
    console.log(product)
    if(!this.isProductInCart(product._id!)){
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });;
    }
  }

  isProductInCart(productId: string){
    if(this.cartService.items.find(x=>x.product._id==productId)){
      return true;
    } else {
      return false;
    }
  }
}
