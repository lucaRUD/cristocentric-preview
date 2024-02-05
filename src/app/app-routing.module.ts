import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './authentication/activate-account/activate-account.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ActivationInstructionsComponent } from './authentication/activation-instructions/activation-instructions.component';
import { ProductCatalogComponent } from './products/product-catalog/product-catalog.component';
import { DonateComponent } from './donate/donate.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CartComponent } from './order-components/cart/cart.component';
import { canActivate, isRedirected } from './services/auth-guard.service';
import { OrderFormComponent } from './order-components/orderform/orderform.component';
import { OrderCompleteComponent } from './order-components/order-complete/order-complete.component';
import { Dashboard1Component } from './dashboard/dashboard1.component';
import { ArticlesComponent } from './article-components/articles/articles.component';
import { ArticleComponent } from './article-components/article/article.component';
import { EventsComponent } from './event-components/events/events.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [canActivate] },
  { path: 'home', component: HomeComponent, data: { animation: 'isLeft' } },
  { path: 'donate', component: DonateComponent },
  { path: 'settings', component: Dashboard1Component },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'isRight' },
    canActivate: [canActivate],
  },
  {
    path: 'activation-instructions',
    component: ActivationInstructionsComponent,
    canActivate: [isRedirected],
  },
  { path: 'activate-account/:uid/:token', component: ActivateAccountComponent },
  {
    path: 'store',
    component: ProductCatalogComponent,
    data: { animation: 'isRight' },
  },
  { path: 'store/product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'cart/checkout',
    component: OrderFormComponent,
    canActivate: [isRedirected],
  },
  {
    path: 'order-complete',
    component: OrderCompleteComponent,
    canActivate: [canActivate],
  },
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/:id', component: Event },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
