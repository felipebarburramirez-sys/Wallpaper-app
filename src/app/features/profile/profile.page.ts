import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: false,
})
export default class profilePage implements OnInit {
  public constructor(private router: Router) {}

  public ngOnInit() {}

  navigateToUserInfo() {
    this.router.navigate(["/user-info"])
  }
}
