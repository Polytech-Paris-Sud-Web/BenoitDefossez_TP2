import { Injectable } from '@angular/core';
import {Observable, of, map} from "rxjs";
import {Author} from "../models/author";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private preloadAuthors : Author[] | undefined;

  constructor(private http : HttpClient) { }

  public preloadAuthors$(): Observable<Author[]> {
    if (!this.preloadAuthors) {
      return this.http.get<Author[]>(`${environment.apiUrl}/authors`).pipe(
        map(authors => {
          this.preloadAuthors = authors;
          return authors;
        })
      );
    }
    return of(this.preloadAuthors);
  }

  public getName(name: string): Observable<Author> {
    const defaultAuthor : Author = {
      name: 'Unknow author',
      id: 0,
      biography: '',
    }
    return of(this.preloadAuthors?.find(author => author.name === name) || defaultAuthor);
  }
}
