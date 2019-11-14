import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { 

  }

  ngOnInit() {
    this.posts$ = this.postsService.getAllPost();
  }

  openPost(postId){
    return this.router.navigate([`/post/${postId}`]);
  }
}
