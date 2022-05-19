import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Author} from "../models/author";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http : HttpClient) { }

  public getName(name: string): Observable<Author[]> {
    return this.http.get<Author[]>(`http://localhost:3000/authors?name=${name}`);
  }
}
