import { Component } from "@angular/core";
import { JokeService } from "../joke.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  jokeStr: string;

  constructor(private jokeSvc: JokeService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.jokeSvc.isInit) {
      this.getJoke();
      this.jokeSvc.isInit = !this.jokeSvc.isInit;
    } else {
      this.jokeStr = this.jokeSvc.jokeStr;
    }
  }

  getJoke() {
    this.jokeSvc.getRandomjoke().subscribe(
      data =>
        (this.jokeSvc.jokeStr = this.jokeStr = data["attachments"][0].text),
      err => {
        this.jokeSvc.jokeStr = this.jokeStr =
          "What are computers favorite snacks? Microchips, phish sticks, and cookies. But just a few bytes of each.";
      }
    );
  }

  tweetJoke() {
    let url =
      "https://twitter.com/intent/tweet?text=" +
      this.jokeStr +
      "&hashtags=" +
      "dadjoke";
    window.open(url);
  }

  copyToClipBoard() {
    try {
      const selBox = document.createElement("textarea");
      selBox.style.position = "fixed";
      selBox.style.left = "0";
      selBox.style.top = "0";
      selBox.style.opacity = "0";
      selBox.value = this.jokeStr;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand("copy");
      document.body.removeChild(selBox);
      this._snackBar.open("Joke Copied!", "close", {
        duration: 2000,
        verticalPosition: "bottom",
        horizontalPosition: "right"
      });
    } catch (error) {}
  }
}
