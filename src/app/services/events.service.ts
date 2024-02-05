import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { eventsCristocentric } from 'src/events-cristocentric';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseUrl = 'http://localhost:8000/events/';
  private baseUrlpublic = 'http://localhost:8000/events-public/';

  constructor(private http: HttpClient) {}

  getPublicEvents(): Observable<eventsCristocentric[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
  
    return this.http.get<eventsCristocentric[]>(`${this.baseUrlpublic}?is_public=true`, { headers, withCredentials: true })
      .pipe(
        map((events: eventsCristocentric[]) => {
          return events.map((event: eventsCristocentric) => {
            return {
              ...event,
              image: `http://localhost:8000${event.image}`
            };
          });
        })
      );
  }
  

  getEvents(page: number, pageSize: number): Observable<{
    events: eventsCristocentric[];
    totalPages: number;
    currentPage: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.get<{
      events: eventsCristocentric[];
      total_pages: number;
      current_page: number;
    }>(this.baseUrl, { params, headers, withCredentials: true }).pipe(
      map(response => {
        const { events, total_pages, current_page } = response;
        const updatedEvents = events.map(event => {
          return {
            ...event,
            image: `http://localhost:8000${event.image}`
          };
        });

        return {
          events: updatedEvents,
          totalPages: total_pages,
          currentPage: current_page
        };
      })
    );
  }

  getEvent(id: number): Observable<eventsCristocentric> {
    const url = `${this.baseUrl}${id}/`;
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCookie('csrftoken'),
    });
    return this.http
      .get<eventsCristocentric>(url, { headers, withCredentials: true })
      .pipe(
        map((event: eventsCristocentric) => {
          return {
            ...event,
            image: `http://localhost:8000${event.image}`,
          };
        })
      );
  }

  createEvent(eventData: eventsCristocentric): Observable<eventsCristocentric> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.post<eventsCristocentric>(this.baseUrl, eventData, {
      headers,
      withCredentials: true,
    });
  }

  updateEvent(
    id: number,
    eventData: eventsCristocentric
  ): Observable<eventsCristocentric> {
    const url = `${this.baseUrl}${id}/`;
    console.log(eventData);
    const { image, ...eventDataWithoutImage } = eventData;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http
      .put<eventsCristocentric>(url, eventDataWithoutImage, {
        headers,
        withCredentials: true,
      })
      .pipe(
        map((updatedEvent: eventsCristocentric) => {
          return {
            ...updatedEvent,
            image: `http://localhost:8000${updatedEvent.image}`,
          };
        })
      );
  }

  deleteEvent(id: number): Observable<{}> {
    const url = `${this.baseUrl}${id}/`;
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.delete(url, { headers, withCredentials: true });
  }

  private getCookie(name: string): string {
    let cookieValue = '';
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const cookieStr = cookie.trim();
        if (cookieStr.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(
            cookieStr.substring(name.length + 1)
          );
          break;
        }
      }
    }
    return cookieValue;
  }

  uploadFile(file: File, eventId: number): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    // Replace this URL with the URL of your file upload API endpoint
    const url = `http://localhost:8000/event-upload-file/${eventId}/`;

    return this.http
      .post<{ url: string }>(url, formData)
      .pipe(map((response) => response.url));
  }

  saveEvent(eventId: number): Observable<any> {
    const url = 'http://localhost:8000/accounts/save-event/';
    const body = { eventId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.post(url, body, { headers, withCredentials: true });
  }

  removeEvent(eventId: number): Observable<any> {
    const url = 'http://localhost:8000/accounts/remove-event/';
    const body = { eventId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.post(url, body, { headers, withCredentials: true });
  }

  getSavedEventsForCurrentUser(): Observable<eventsCristocentric[]> {
    const url = 'http://localhost:8000/accounts/save-event/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCookie('csrftoken'),
    });

    return this.http.get<eventsCristocentric[]>(url, { headers, withCredentials: true });
  }
}




