import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { eventsCristocentric } from 'src/events-cristocentric';
import { EventsService } from 'src/app/services/events.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayContentComponent } from '../overlay-content/overlay-content.component';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: eventsCristocentric[] = [];


  constructor(private eventsService: EventsService,private overlay: Overlay) {}

  ngOnInit(): void {
    this.getPublicEvents();
  }

  getPublicEvents(): void {
    this.eventsService.getPublicEvents()
      .subscribe((events) => {
        this.events = events;
      });
  }

  private overlayRef!: OverlayRef;

  openOverlay(event: eventsCristocentric): void {
    // Create a new overlay
    this.overlayRef = this.overlay.create({
      // Customize the position and size of the overlay here
      // See https://material.angular.io/cdk/overlay/overview for more options
    });
  
    // Create a new ComponentPortal with the OverlayContentComponent
    const portal = new ComponentPortal(OverlayContentComponent);
  
    // Attach the portal to the overlay
    const overlayContentRef = this.overlayRef.attach(portal);
  
    // Pass the event data as an input to the OverlayContentComponent
    overlayContentRef.instance.event = event;
  
    // Listen for the close event from the OverlayContentComponent
    overlayContentRef.instance.close.subscribe(() => {
      // Close the overlay when the close event is received
      this.overlayRef.detach();
    });
  }


}
