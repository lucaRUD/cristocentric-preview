import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedEventsComponent } from './saved-events.component';

describe('SavedEventsComponent', () => {
  let component: SavedEventsComponent;
  let fixture: ComponentFixture<SavedEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedEventsComponent]
    });
    fixture = TestBed.createComponent(SavedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
