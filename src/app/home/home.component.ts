import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SeoService } from "../../seoService";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private seo: SeoService
  ) {}
  ngOnInit() {
    this.seo.generateTags({
      title: "About Page",
      description:
        "Contact me through this awesome search engine optimized Angular component",
      image:
        "https://images.pexels.com/photos/3817038/pexels-photo-3817038.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      slug: "about-page",
      url: "https://arcane-ridge-37333.herokuapp.com/",
    });
  }

  onLoadServer(id: number) {
    // complex calculation
    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { allowEdit: "1" },
      fragment: "loading",
    });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
