import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-mini',
  templateUrl: './products-mini.component.html',
  styleUrls: ['./products-mini.component.css']
})
export class ProductsMiniComponent {
  constructor(
    private router: Router,
  ) {}
}
