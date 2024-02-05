import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Dashboard1Component } from "./dashboard1.component";

describe("Dashboard1Component", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [Dashboard1Component]
    }).compileComponents();
  }));

  it("should create the Dashboard1", () => {
    const fixture = TestBed.createComponent(Dashboard1Component);
    const Dashboard1 = fixture.debugElement.componentInstance;
    expect(Dashboard1).toBeTruthy();
  });

  it(`should have as title 'black-dashboard-angular'`, () => {
    const fixture = TestBed.createComponent(Dashboard1Component);
    const Dashboard1 = fixture.debugElement.componentInstance;
    expect(Dashboard1.title).toEqual("black-dashboard-angular");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(Dashboard1Component);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to black-dashboard-angular!"
    );
  });
});
