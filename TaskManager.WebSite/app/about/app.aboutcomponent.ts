import { Component } from "@angular/core";

@Component({
    selector: "about",
    template: "<h2>{{pageTitle}}</h2>"
})
export class AboutComponent {
    pageTitle: string = "About";
}