import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderData } from 'src/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderDataSource = new BehaviorSubject<OrderData | null>(null);
  orderData$ = this.orderDataSource.asObservable();

  constructor(private http: HttpClient) {
    // Retrieve the orderData object from local storage
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      this.orderDataSource.next(JSON.parse(storedOrderData));
    }
    console.log(this.orderData$);
  }

  updateOrderData(orderData: OrderData) {
    // Update the value of the orderDataSource BehaviorSubject
    this.orderDataSource.next(orderData);

    // Store the orderData object in local storage
    localStorage.setItem('orderData', JSON.stringify(orderData));
  }

  createOrder(orderData: OrderData) {
    console.log(orderData);

    // Set the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.post('http://localhost:8000/accounts/orders/', orderData, {
      headers: headers,
      withCredentials: true,
    });
  }
  // Helper function to retrieve the CSRF token from the cookie
  private getCookie(name: string): string {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const cookieStr = cookie.trim();
        if (cookieStr.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(
            cookieStr.substring(name.length + 1)
          );
          break;
        }
      }
    }
    return cookieValue;
  }
  addOrderData(orderData: any) {
    // Retrieve the CSRF token from the cookie
    const csrfToken = this.getCookie('csrftoken');

    // Create the request headers with the CSRF token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });

    // Make the request with the headers
    return this.http.post('http://localhost:8000/addorders/', orderData, {
      headers: headers,
      withCredentials: true,
    });
  }

  getOrders() {
    return this.http.get('http://localhost:8000/accounts/get-orders/', {
      withCredentials: true,
    });
  }

  getProdigiOrders(orderIds: string[]) {
    const params = new HttpParams().set('order_ids', orderIds.join(','));
    return this.http.get('http://localhost:8000/accounts/order-details/', {
      params,
    });
  }

  cancelOrder(orderId: string): Observable<any> {
    const url = `http://localhost:8000/accounts/cancel-order/`;
    const data = { order_id: orderId };

    return this.http.post(url, data, { withCredentials: true });
  }
}
