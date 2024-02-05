import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { eventsCristocentric } from 'src/events-cristocentric';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';
import { EventsService } from 'src/app/services/events.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css'],
})
export class EventEditorComponent implements OnInit {
  event!: eventsCristocentric;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventsService.getEvent(id).subscribe((event) => {
      this.event = event;
    });
  }
  showToaster(message:string){
    this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message, '', {
      disableTimeOut: true,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'left'
    });
  }

  saveEvent(): void {
    if (this.event.id !== undefined) {
      this.eventsService.updateEvent(this.event.id, this.event).subscribe();
      this.showToaster('Changes saved.')
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    // Upload the file to your server and update the specified article
    if (this.event.id !== undefined) {
      this.eventsService
        .uploadFile(file, this.event.id)
        .subscribe((imagePath) => {
          // Construct the correct URL of the uploaded image file
          const domain = 'http://localhost:8000';
          const imageUrl = domain + imagePath;

          // Update the main_image property of the article with the URL of the uploaded file
          this.event.image = imageUrl;
        });
    }
  }

  openImageModal(imageUrl: string | undefined): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: imageUrl,
      // Add this CSS class for custom styling
    });
  }
}
