import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ArticlesComponent } from "../../pages/articles/articles.component";
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../pages/confirmation-dialog/confirmation-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { ArticleEditorComponent } from '../../pages/article-editor/article-editor.component';
import { QuillModule } from 'ngx-quill';
import { EventEditorComponent } from '../../pages/event-editor/event-editor.component';
import { EventsComponent } from '../../pages/events/events.component';
import { SavedEventsComponent } from '../../pages/saved-events/saved-events.component';
import { OrdersComponent } from "../../pages/orders/orders.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    QuillModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    ArticlesComponent,
    ArticleEditorComponent,
    TypographyComponent,
    NotificationsComponent,
    ConfirmationDialogComponent,
    MapComponent,
    EventEditorComponent,
    EventsComponent,
    SavedEventsComponent,
    OrdersComponent,
  ],
})
export class AdminLayoutModule {}
