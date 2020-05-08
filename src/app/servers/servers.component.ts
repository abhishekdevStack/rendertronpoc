import { Component, OnInit } from "@angular/core";
import { ServersService } from "./servers.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SeoService } from "src/seoService";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  private servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
    this.seo.generateTags({
      title: "Servers Page",
      description: "Find All detail about servers",
      image:
        "https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      slug: "servers-page",
    });
  }

  onReload() {
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
