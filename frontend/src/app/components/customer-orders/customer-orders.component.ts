import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../types/product';

@Component({
  selector: 'app-customer-orders',
  imports: [CommonModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {
  orders:Order[]=[];
  orderService=inject(OrderService);
  
  ngOnInit(){
    this.orderService.getCustomerOrders().subscribe(result => {
      this.orders = result;
      console.log(this.orders,'orders')
    })
  }

    sellingPrice(product:Product){
      return Math.round(
        product.price - (product.price * product.discount) / 100
      );
    }

  getOrderTotal(order: any): number {
  return order.items.reduce((sum: number, item: any) => {
    return sum + (this.sellingPrice(item.product) * item.quantity);
  }, 0);
}

}
