import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { eventsCristocentric } from 'src/events-cristocentric';

@Component({
  selector: 'app-saved-events',
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.css']
})
export class SavedEventsComponent {
  savedEvents: eventsCristocentric[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.getSavedEventsForCurrentUser().subscribe(events => {
      console.log(events)
      this.savedEvents = events;
      console.log(this.savedEvents);
    });
  }

  removeEvent(eventId: number | undefined): void {

    if(eventId !== undefined)
      this.eventsService.removeEvent(eventId).subscribe(response => {
      // Handle the response here
      // For example, you can remove the event from the savedEvents array
        this.savedEvents = this.savedEvents.filter(event => event.id !== eventId);
    });
  }
}
