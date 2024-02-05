import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from 'src/app/services/events.service';
import { eventsCristocentric } from 'src/events-cristocentric';

@Component({
  selector: 'app-overlay-content',
  templateUrl: './overlay-content.component.html',
  styleUrls: ['./overlay-content.component.css'],
})
export class OverlayContentComponent {
  @Input() event?: eventsCristocentric;
  @Output() close = new EventEmitter<void>();

  constructor(
    private eventsService: EventsService,
    private toastr: ToastrService
  ) {}

  closeOverlay(): void {
    this.close.emit();
  }
  showToaster(message: string) {
    this.toastr.success(
      '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' +
        message,
      '',
      {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + 'left',
      }
    );
  }

  showToastererror(message: string) {
    this.toastr.success(
      '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' +
        message,
      '',
      {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + 'left',
      }
    );
  }

  saveEvent(): void {
    if (this.event) {
      if (this.event.id !== undefined)
        this.eventsService.saveEvent(this.event.id).subscribe(
          (response) => {
            // Handle the response here
            this.showToaster('Event saved. You will get reminded by email.');
          },
          (error) => {
            // Handle the error here
            this.showToastererror('You are not logged in.');
            console.error(error);
          }
        );
    }
  }
}
