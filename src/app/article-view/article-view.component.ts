import { Component, OnInit, Input } from '@angular/core';
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {

  @Input()
  article : Article = {
    title: "",
    content: "",
    author: "",
    id: 0
  };

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService) {
   const id = parseInt(this.route.snapshot.paramMap.get('id') || '0');
   this.articleService.getId(id).subscribe(value => {
     this.article = value;
   });
  }

  ngOnInit() {
  }

  delete(article: Article) {
   this.articleService.delete(article.id).subscribe(()=>{
     this.router.navigate(['']);
   });
  }
}
