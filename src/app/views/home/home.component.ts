import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { PostsService } from '../../services/posts/posts.service';
import { Subscription } from 'rxjs';
import { sum, values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: any[];
  user: User;
  subscription: Subscription;
  userVote: number = 0;

  constructor(
    private router: Router,
    private postService: PostService,
    private postsService: PostsService,
    private toast: ToastrService,
    private auth: AuthService,
  ) { 

  }

  ngOnInit() {
    this.subscription = this.auth.user$
    .pipe(
      map(user=> this.user = user),
      switchMap(user => {
        return this.postsService.getAllPost()
        .pipe(
          map((posts: Post[]) => {
            posts.forEach((post: Post) => {
              var _post = post;
              if (post.votes){
                _post['voteCount'] = sum(values(post.votes));
              } else {
                _post['voteCount'] = 0;
              }
              if (user && post.votes) {
                _post['userVote'] = post.votes[user.uid]
              } else {
                _post['userVote'] = 0
              }
              _post['show'] = false;
            })
            return posts;
          })
        )
      })
    ).subscribe(posts => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openPost(postId) {
    return this.router.navigate([`/post/${postId}`]);
  }

  upvote(postId: string, userVote: number) {
    if (this.user == null){
      this.toast.error("You must login to upvote post");
    } else{
      let vote = userVote == 1 ? 0 : 1
      this.postService.updateUserVote(postId, this.user.uid, vote)
    }
  }

  downvote(postId: string, userVote: number) {
    if (this.user == null){
      this.toast.error("You must login to downvote post");
    } else{
      let vote = userVote == -1 ? 0 : -1
      this.postService.updateUserVote(postId, this.user.uid, vote)
    }
  }

  onShow(postId: string) {
    this.posts.forEach(post => {
      if (post.id === postId){
        post.show = !post.show
      }
    })
  }
}
