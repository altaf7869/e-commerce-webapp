import { Component, inject, resource } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../types/product';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartService = inject(CartService);
  router=inject(Router);

  ngOnInit(){
    this.cartService.init();
  }

  sellingPrice(product:Product){
    return Math.round(
      product.price - (product.price * product.discount) / 100
    );
  }
  get cartItems(){
    return this.cartService.items;
  }


  addToCart(productId:string, quantity:number){
    this.cartService.addToCart(productId, quantity).subscribe(result => {
      this.cartService.init();
    })
  }


  get totalAmount(){
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++){
      const element = this.cartItems[index];
      amount+= this.sellingPrice(element.product)*element.quantity;
    }
    return amount;
  }

  orderStep:number=0;
  formBuilder = inject(FormBuilder);
  paymentType='cash'
  addressForm = this.formBuilder.group({
    address1:[''],
    address2:[''],
    city:[''],
    pincode:['']
  })

  checkout(){
    this.orderStep=1
  }
  addAddress(){
    this.orderStep=2
  }
  orderService = inject(OrderService);
  completeOrder(){
    let order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    }
    this.orderService.addOrder(order).subscribe((result) => {
      alert('Your order is completed.');
      this.cartService.init();
      this.orderStep=0;
      this.router.navigateByUrl('/orders')
    })
   
  }
}
