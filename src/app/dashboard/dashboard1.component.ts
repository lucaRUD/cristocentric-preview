import { Component } from "@angular/core";

@Component({
  selector: "dashboard1-root",
  templateUrl: "./dashboard1.component.html",
  styleUrls: ["./dashboard1.component.scss"]
})
export class Dashboard1Component {
  title = "black-dashboard-angular";
  shouldShowAppComponent: boolean = false;

}
