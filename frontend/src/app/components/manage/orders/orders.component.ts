import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../../types/order';
import { Product } from '../../../types/product';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orderService = inject(OrderService);
  orders: Order[]=[];
  ngOnInit(){
    this.orderService.getAdminAllOrders().subscribe((result) => {
      this.orders = result;
    })
  }

    sellingPrice(product:Product){
        return Math.round(
          product.price - (product.price * product.discount) / 100
        );
      }
    
      statusChange(event: Event, order: Order) {
        const selectedStatus = (event.target as HTMLSelectElement).value;
    
        this.orderService.updateOrderStatus(order._id!, selectedStatus).subscribe(() => {
          alert("Order status changed");
           order.status = selectedStatus;
          this.orderService.getCustomerOrders();
        });
      }

      getOrderTotal(order: any): number {
  return order.items.reduce((sum: number, i: any) => {
    return sum + (this.sellingPrice(i.product) * i.quantity);
  }, 0);
}


}
