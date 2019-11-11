import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../../services/post/post.service'
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: any;

  constructor(
    private router: ActivatedRoute,
    private ps: PostService
  ) {
    
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.post = this.ps.getPost(params['id']);
    });
  }

}
