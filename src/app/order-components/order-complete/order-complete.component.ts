import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css'],
})
export class OrderCompleteComponent implements OnInit, AfterViewInit {
  orderDataSubscription?: Subscription;
  orderCreated: boolean = false; // Flag variable to track order creation status

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Extract the sessionId from the URL
    const sessionId = this.route.snapshot.queryParamMap.get('sessionId');

    // Check if the order has already been created
    const orderCreatedFlag = localStorage.getItem('orderCreated');
    // if (orderCreatedFlag === 'true') {
    //   console.log('Order has already been created');

    //   // Reset the orderCreated flag in localStorage
    //   localStorage.setItem('orderCreated', 'false');
    //   return; // Skip the order creation process
    // }

    // Use the sessionId to retrieve information about the completed checkout session from Stripe
    // ...
    console.log(this.authService.getAuthStatus());
  }

  ngAfterViewInit() {
    // Check if the user is logged in
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // User is logged in, create the order

        // Subscribe to the orderData$ BehaviorSubject of the OrderService
        this.orderDataSubscription = this.orderService.orderData$.subscribe(
          (orderData) => {
            // Check if the value emitted by the orderData$ observable is not null
            if (orderData) {
              // Log the value of the orderData object
              console.log('ORDER DATA EXISTS');
              // Create an order using the Prodigi API
              this.orderService.createOrder(orderData).subscribe((response) => {
                // Handle the response from the Prodigi API
                console.log('Order created:', response);

                // Add the data from the order to the database
                this.orderService
                  .addOrderData(response)
                  .subscribe((response) => {
                    // Handle the response from the AddOrderDataAPIView
                    console.log('Order data added:', response);
                  });

                // Empty the cart
                this.cartService.clearCart();

                // Set the orderCreated flag to true
                this.orderCreated = true;

                // Store the orderCreated flag in localStorage
                localStorage.setItem('orderCreated', 'true');

                // Unsubscribe from the orderData$ BehaviorSubject of the OrderService
                if (this.orderDataSubscription) {
                  this.orderDataSubscription.unsubscribe();
                }
              });
            }
          }
        );
      } else {
        // User is not logged in, redirect to login page or show a message
        // ...
      }
    });
  }
}
