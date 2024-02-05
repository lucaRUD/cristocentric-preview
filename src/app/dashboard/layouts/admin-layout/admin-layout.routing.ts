import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapComponent } from '../../pages/map/map.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UserComponent } from '../../pages/user/user.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { ArticlesComponent } from '../../pages/articles/articles.component';
import { ArticleEditorComponent } from '../../pages/article-editor/article-editor.component';
import { EventsComponent } from '../../pages/events/events.component';
import { EventEditorComponent } from '../../pages/event-editor/event-editor.component';
import { SavedEventsComponent } from '../../pages/saved-events/saved-events.component';
import { OrdersComponent } from '../../pages/orders/orders.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard/icons', component: IconsComponent },
  { path: 'maps', component: MapComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'dashboard/user', component: UserComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'dashboard/orders', component: OrdersComponent },
  { path: 'dashboard/articles', component: ArticlesComponent },
  {
    path: 'dashboard/articles/article-editor/:id',
    component: ArticleEditorComponent,
  },
  { path: 'dashboard/events', component: EventsComponent },
  {
    path: 'dashboard/events/event-editor/:id',
    component: EventEditorComponent,
  },
  { path: 'dashboard/saved-events', component: SavedEventsComponent },
];
