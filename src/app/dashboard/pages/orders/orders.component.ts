import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        const orders = response as any[];
        const orderIds = orders.map(order => order.prodigi_order_id);
        this.getProdigiOrders(orderIds);
      },
      error => {
        // Handle error
      }
    );
  }

  getProdigiOrders(orderIds: string[]): void {
    this.orderService.getProdigiOrders(orderIds).subscribe(
      (response: any) => {
        const prodigiOrders = response as any[];
        this.orders = prodigiOrders;
        console.log(this.orders)
      },
      error => {
        // Handle error
      }
    );
  }
  cancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId).subscribe(
      response => {
        // Handle the response from the API if needed
        console.log('Order canceled:', response);
        // Update the status of the order in your component or reload the orders list
      },
      error => {
        // Handle error if the cancellation request fails
        console.error('Error canceling order:', error);
      }
    );
  }

  


}
