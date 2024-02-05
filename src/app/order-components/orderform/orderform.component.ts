import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { OrderData } from 'src/order';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css'],
})
export class OrderFormComponent {
  orderData!: OrderData;
  orderFormData!: FormGroup;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.orderFormData = new FormGroup({
      name: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      zipCode: new FormControl(''),
      countryCode: new FormControl(''),
      city: new FormControl(''),
      county: new FormControl(''),
    });
    console.log('Initialized orderData:', this.orderData);
    // Subscribe to the orderData$ BehaviorSubject of the OrderService
    this.orderService.orderData$.subscribe((orderData) => {
      // Check if the value emitted by the orderData$ observable is not null
      if (orderData) {
        // Assign the current value of the orderData object to the orderData property
        this.orderData = orderData;
      }
    });

    // Subscribe to the items$ BehaviorSubject of the CartService
    this.cartService.items$.subscribe((cartItems) => {
      // Log the value of the cartItems array
      console.log('Cart items:', cartItems);

      // Map the Product objects to the format expected by the Prodigi API
      const prodigiItems = cartItems.map((item) => ({
        merchantReference: item.name,
        sku: item.sku,
        copies: item.quantity,
        sizing: 'fillPrintArea',
        attributes: {
          color: item.selectedColor,
          size: item.selectedSize,
        },
        recipientCost: {
          amount: parseFloat(item.price.toFixed(2)).toString(),
          currency: 'USD',
        },
        assets: [
          {
            printArea: 'default',
            url: item.image,
          },
        ],
      }));

      // Update the items field of the orderData object in the OrderService
      this.orderService.updateOrderData({
        ...this.orderData,
        items: prodigiItems,
      });
    });
  }

  onSubmit() {
    console.log('Submitted orderData:', this.orderData);
    // Calculate the total amount of the order
    this.orderData.merchantReference = 'Cristocentric';
    this.orderData.shippingMethod = 'Budget';
    const amount = this.orderData.items.reduce(
      (total, item) =>
        total +
        (item.copies || 0) * parseFloat(item.recipientCost?.amount || '0'),
      0
    );
    // Check if the amount is greater than zero
    if (amount > 0) {
      // Format the recipient object
      const recipient = {
        name: this.orderFormData.value.name,
        address: {
          line1: this.orderFormData.value.addressLine1,
          line2: this.orderFormData.value.addressLine2 || 'no_adress_line_2',
          postalOrZipCode: this.orderFormData.value.zipCode,
          countryCode: this.orderFormData.value.countryCode,
          townOrCity: this.orderFormData.value.city,
          stateOrCounty: this.orderFormData.value.county,
        },
      };

      // Update the recipient field of the orderData object in the OrderService
      this.orderService.updateOrderData({
        ...this.orderData,
        recipient: recipient,
      });

      // Convert the amount to an integer representing the total amount in cents
      const amountInCents = Math.round(amount * 100);

      // Update the orderData property of the OrderService with the data entered by the user
      this.orderService.updateOrderData(this.orderData);

      // Process the payment using your PaymentService
      this.paymentService.checkout(amountInCents);
    }
  }
}
