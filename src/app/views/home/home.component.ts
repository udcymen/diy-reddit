import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: Post[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { 

  }

  ngOnInit() {
    this.subscription = this.postsService.getAllPost().subscribe(posts => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openPost(postId){
    return this.router.navigate([`/post/${postId}`]);
  }
}
