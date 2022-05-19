import { Component, OnInit, Input } from '@angular/core';
import {Author} from '../models/author';
import {AuthorService} from "../services/author.service";
import {Observable} from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input()
  author: Author= {
    name: "Unknow author",
    biography: "",
    id: 0
  };

  constructor(private route: ActivatedRoute, private authorService: AuthorService) {
    const name = this.route.snapshot.paramMap.get('name') || '';
    this.authorService.getName(name).subscribe(value => {
      this.author = value[0];
    });
  }

  ngOnInit(): void {
  }

}
