import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';

export const appRoutes: Routes = [
  { path: 'create', component: ArticleCreationComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleViewComponent },
  { path: 'author/:name', component: AuthorComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
