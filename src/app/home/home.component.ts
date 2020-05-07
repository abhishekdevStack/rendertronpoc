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
      image: "https://www.example.com/assets/meerkat.jpeg",
      slug: "about-page",
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
