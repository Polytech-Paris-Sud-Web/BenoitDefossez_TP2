import {Component, OnInit} from '@angular/core';
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _articles! : Observable<Article[]>;

  constructor(private articleService: ArticleService) {
    this._articles = this.articleService.getLast();
  }

  articles(): Observable<Article[]> {
    return this._articles;
  }

  ngOnInit() {
  }

  delete(article: Article){
    this.articleService.delete(article.id).subscribe(()=>{
      this._articles = this.articleService.getLast();
    });
  }

}
