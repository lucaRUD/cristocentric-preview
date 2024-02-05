import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // {
  //   path: '/dashboard',
  //   title: 'Dashboard',
  //   icon: 'icon-chart-pie-36',
  //   class: '',
  // },
  {
    path: 'dashboard/user',
    title: 'User Profile',
    icon: 'icon-single-02',
    class: '',
  },
  {
    path: 'dashboard/saved-events',
    title: 'Saved events',
    icon: 'icon-calendar-60',
    class: '',
  },
  {
    path: 'dashboard/articles',
    title: 'Articles',
    icon: 'icon-paper',
    class: '',
  },
  {
    path: 'dashboard/events',
    title: 'Events',
    icon: 'icon-world',
    class: '',
  },
  {
    path: 'dashboard/orders',
    title: 'Orders',
    icon: 'icon-cart',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems!: RouteInfo[];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.authService.getUserData().subscribe((user) => {
          const isStaff = user?.is_staff || false;
          this.menuItems = ROUTES.filter(
            (menuItem) =>
              menuItem &&
              (menuItem.path !== 'dashboard/articles' ||
                isStaff) && // Show "Articles" route only for staff members
              (menuItem.path !== 'dashboard/events' ||
                isStaff) // Show "Events" route only for staff members
          );
        });
      } else {
        this.menuItems = ROUTES.filter(
          (menuItem) =>
            menuItem &&
            menuItem.path !== 'dashboard/articles' &&
            menuItem.path !== 'dashboard/events'
        );
      }
    });
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}