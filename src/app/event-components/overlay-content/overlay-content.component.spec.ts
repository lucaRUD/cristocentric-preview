import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContentComponent } from './overlay-content.component';

describe('OverlayContentComponent', () => {
  let component: OverlayContentComponent;
  let fixture: ComponentFixture<OverlayContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayContentComponent]
    });
    fixture = TestBed.createComponent(OverlayContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
