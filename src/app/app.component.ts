import { Component } from '@angular/core';
import { ArticleService } from './services/article.service';
import { AuthorService } from './services/author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'service-app';

  constructor(private articleService: ArticleService, private authorService : AuthorService) { }

  ngOnInit() {
    this.authorService.preloadAuthors$().subscribe();
    this.articleService.preloadArticles$().subscribe();
  }
}
