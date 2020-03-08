import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class JokeService {
  isInit: boolean = true;
  jokeStr: string;
  constructor(private http: HttpClient) {}

  getRandomjoke() {
    return this.http
      .get("https://icanhazdadjoke.com/slack")
      .pipe(catchError(this.handleError));
  }

  handleError() {
    return throwError("Network Error Occured");
  }
}
