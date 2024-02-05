import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './authentication/activate-account/activate-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './stable-component/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ActivationInstructionsComponent } from './authentication/activation-instructions/activation-instructions.component';
import { MatCardModule } from '@angular/material/card';
import { ProductCatalogComponent } from './products/product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { DonateComponent } from './donate/donate.component';
import { CartComponent } from './order-components/cart/cart.component';
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from './order-components/cart-dialog/cart-dialog.component';
import { FooterComponent } from './stable-component/footer/footer.component';
import { OrderFormComponent } from './order-components/orderform/orderform.component';
import { OrderCompleteComponent } from './order-components/order-complete/order-complete.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Dashboard1Module } from './dashboard/dashboard1.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ArticlesComponent } from './article-components/articles/articles.component';
import { ArticleComponent } from './article-components/article/article.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ClockComponent } from './clock/clock.component';
import { ProductsMiniComponent } from './products/products-mini/products-mini.component';
import { NgxScrollPositionRestorationModule } from 'ngx-scroll-position-restoration';
import { EventsComponent } from './event-components/events/events.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayContentComponent } from './event-components/overlay-content/overlay-content.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ActivateAccountComponent,
    NavbarComponent,
    DropdownComponent,
    ActivationInstructionsComponent,
    ProductCatalogComponent,
    ProductDetailsComponent,
    DonateComponent,
    CartComponent,
    LoginDialogComponent,
    CartDialogComponent,
    FooterComponent,
    OrderFormComponent,
    OrderCompleteComponent,
    ConfirmationDialogComponent,
    ArticlesComponent,
    ArticleComponent,
    ImageModalComponent,
    ClockComponent,
    ProductsMiniComponent,
    EventsComponent,
    OverlayContentComponent,
    AboutComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    OverlayModule,
    ToastrModule.forRoot(),
    Dashboard1Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
