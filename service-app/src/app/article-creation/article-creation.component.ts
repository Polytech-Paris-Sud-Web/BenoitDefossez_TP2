import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ArticleService} from "../services/article.service";
import {RawArticle} from "../models/raw-article";
import {Article} from "../models/article";
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;

  @Output()
  newArticle : EventEmitter<Article> = new EventEmitter();

  constructor(private router: Router, private fb: FormBuilder, private articleService : ArticleService) {
    this.articleForm = this.fb.group({
      title: ['title', Validators.required ],
      content : ['content', Validators.required ],
      author : ['author', Validators.required ],
    });
  }

  ngOnInit() {
  }

  createArticle(){
    const formModel = this.articleForm.value;
    const rawArticle : RawArticle = {
      title : formModel.title,
      content : formModel.content,
      author : formModel.author
    }
    this.articleService.add(rawArticle).subscribe((article) => this.newArticle.emit(article));
    this.router.navigate(['']);
  }
}
