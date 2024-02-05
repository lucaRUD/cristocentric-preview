import { Component, SecurityContext, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { eventsCristocentric } from 'src/events-cristocentric';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  events: eventsCristocentric[] = [];
  currentPage = 1;
  totalPages = 0;
  pageSize = 5; // Number of events per page

  constructor(
    private eventsService: EventsService,
    private router: Router,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private orderService :OrderService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  showToaster(message:string){
    this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'left'
    });
  }

  getEvents(page?: number): void {
    const pageNumber = page || this.currentPage;
    this.eventsService
      .getEvents(pageNumber, this.pageSize)
      .subscribe((response) => {
        this.events = response.events;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      });
  }

  createEvent(): void {
    const newEvent: eventsCristocentric = {
      title: 'Event Title',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla.',
      location: 'Event Location',
      general_location: 'City,Country',
      date: this.formatDate(new Date()), // Convert Date object to the correct format
      image: undefined, // Initialize the image property as undefined
    };


    this.eventsService.createEvent(newEvent).subscribe((event) => {
      // Append the base URL to the event image
      event.image = `http://localhost:8000${event.image}`;
      this.events.push(event);
      this.showToaster('Event Created')
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  viewEvent(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['dashboard/events/event-editor', id]);
    }
  }

  confirmDelete(id: number | undefined) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.deleteEvent(id);
          this.showToaster('Event deleted.')
        }
      });
    }
  }

  deleteEvent(id: number | undefined) {
    if (id !== undefined) {
      this.eventsService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter((event) => event.id !== id);
      });
    }
  }

  archiveEvent(id: number | undefined): void {
    if (id !== undefined) {
      const event = this.events.find((event) => event.id === id);
      if (event) {
        const updatedEvent = {
          ...event,
          is_archived: true,
          is_public: false,
        };
        this.eventsService.updateEvent(id, updatedEvent).subscribe((event) => {
          const index = this.events.findIndex((event) => event.id === id);
          if (index !== -1) {
            this.events[index] = event;
          }
        });
        this.showToaster('Event Archived.')
      }
    }
  }

  togglePublic(id: number | undefined): void {
    if (id !== undefined) {
      const eventToUpdate = this.events.find((e) => e.id === id);
      if (eventToUpdate) {
        const updatedEvent = {
          ...eventToUpdate,
          is_public: !eventToUpdate.is_public,
          is_archived: eventToUpdate.is_public
            ? eventToUpdate.is_archived
            : false,
        };
        this.eventsService.updateEvent(id, updatedEvent).subscribe((event) => {
          const index = this.events.findIndex((e) => e.id === id);
          if (index !== -1) {
            this.events[index] = event;
          }
        });
        this.showToaster('Event updated.')
      }
    }
  }
  sanitizeHtml(html: string | null): SafeHtml {
    if (html) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } else {
      return '';
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getEvents();
    }
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
