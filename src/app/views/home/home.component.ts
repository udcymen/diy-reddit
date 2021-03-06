import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { Subscription } from 'rxjs';
import { sum, values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs/operators';
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
    private toast: ToastrService,
    private auth: AuthService,
  ) {

  }

  ngOnInit() {
    this.subscription = this.auth.user$
      .pipe(
        map(user => this.user = user),
        switchMap(() => {
          return this.postService.getAllPost()
        })
      )
      .pipe(
        map((posts: Post[]) => {
          posts.forEach((post: Post) => {
            if (values(post.votes).length != 0) {
              post['voteCount'] = sum(values(post.votes));
              if (this.user) {
                post['userVote'] = post.votes[this.user.uid]
              } else {
                post['userVote'] = 0
              }
            } else {
              post['voteCount'] = 0;
            }
            post['show'] = false;
          })
          return posts;
        })
      )
      .subscribe(posts => {
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
    if (this.user == null) {
      this.toast.error("You must login to upvote post");
    } else {
      let vote = userVote == 1 ? 0 : 1
      this.postService.updateUserVote(postId, this.user.uid, vote)
    }
  }

  downvote(postId: string, userVote: number) {
    if (this.user == null) {
      this.toast.error("You must login to downvote post");
    } else {
      let vote = userVote == -1 ? 0 : -1
      this.postService.updateUserVote(postId, this.user.uid, vote)
    }
  }
}
