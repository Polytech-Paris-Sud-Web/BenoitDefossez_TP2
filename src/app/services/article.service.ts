import {Injectable} from '@angular/core';
import {Article} from "../models/article";
import {HttpClient} from "@angular/common/http";
import {Observable, of, map} from "rxjs";
import {RawArticle} from "../models/raw-article";
import { environment } from '../../environments/environment';

@Injectable()
export class ArticleService {

  private preloadArticles : Article[] | undefined;

  constructor(private http : HttpClient) { }

  public preloadArticles$(): Observable<Article[]> {
    if (!this.preloadArticles) {
      return this.http.get<Article[]>(`${environment.apiUrl}/articles?_sort=date&_order=desc`).pipe(
        map(articles => {
          this.preloadArticles = articles;
          return articles;
        })
      );
    }
    return of(this.preloadArticles);
  }

  public get(): Observable<Article[]> {
    return this.preloadArticles ? of(this.preloadArticles) : this.http.get<Article[]>(`${environment.apiUrl}/articles?_sort=date&_order=desc`);
  }

  public getLast(): Observable<Article[]> {
    return this.get().pipe(
      map(articles => articles.slice(0, 10))
    );
  }

  public getId(id:number): Observable<Article> {
    return this.get().pipe(
      map(articles => articles.find(article => article.id === id) as Article)
    );
  }

  public delete(id:number): Observable<any> {
    return this.http.delete<Article>(`${environment.apiUrl}/articles/${id}`);
  }

  public add(newArticle : RawArticle): Observable<Article> {
    const body = {
      date: new Date(),
      ...newArticle
    };
    return this.http.post<Article>(`${environment.apiUrl}/articles`, body);
  }

  public search(mot: string): Observable<Article[]> {
    return this.get().pipe(map(articles => articles.filter(article => article.title.includes(mot) || article.content.includes(mot))));
  }
}
