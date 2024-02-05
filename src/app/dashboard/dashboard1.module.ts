import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { Dashboard1Component } from "./dashboard1.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { Dashboard1RoutingModule } from "./dashboard1-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ArticlesComponent } from './pages/articles/articles.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleEditorComponent } from './pages/article-editor/article-editor.component';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { EventsComponent } from './pages/events/events.component';
import { EventEditorComponent } from './pages/event-editor/event-editor.component';
import { SavedEventsComponent } from './pages/saved-events/saved-events.component';
import { OrdersComponent } from './pages/orders/orders.component'



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,

    RouterModule,
    BrowserModule,
    CommonModule,
    Dashboard1RoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [Dashboard1Component, AdminLayoutComponent, AuthLayoutComponent],
  providers: [],
  bootstrap: [Dashboard1Component]
})
export class Dashboard1Module {}
