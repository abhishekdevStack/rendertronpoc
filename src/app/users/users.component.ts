import { Component, OnInit } from "@angular/core";
import { SeoService } from "src/seoService";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(private seo: SeoService) {}
  users = [
    {
      id: 1,
      name: "Max",
    },
    {
      id: 2,
      name: "Anna",
    },
    {
      id: 3,
      name: "Chris",
    },
  ];

  ngOnInit() {
    this.seo.generateTags({
      title: "Users Page",
      description: "Find All detail about users",
      image:
        "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      slug: "users",
      url: "https://arcane-ridge-37333.herokuapp.com/users",
    });
  }
}
