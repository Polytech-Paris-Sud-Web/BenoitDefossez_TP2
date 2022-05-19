import {Component, OnInit} from '@angular/core';
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  private _articles! : Observable<Article[]>;

  constructor(private articleService: ArticleService) {
    this._articles = this.articleService.get();
  }

  articles(): Observable<Article[]> {
    return this._articles;
  }

  ngOnInit() {
  }

  delete(article: Article){
    this.articleService.delete(article.id).subscribe(()=>{
      this._articles = this.articleService.get();
    });
  }

  searchArticle(e: Event) {
    const keyword = (<HTMLInputElement>e.target).value;
    this._articles = this.articleService.search(keyword); /*.subscribe(value => {
      this._articles = value;
    });*/
  }

  /* Ancienne fonction quand le formulaire était dans cette page
  newArticle(article: Article){
    this._articles = this.articleService.get();
  }*/
}
