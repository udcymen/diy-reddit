import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { Observable, Subscription } from 'rxjs';
import { sum, values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { map, flatMap, switchMap, mergeMap, merge } from 'rxjs/operators';
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
    private postsService: PostsService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private auth: AuthService,
  ) {
    auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.subscription = this.postsService.getAllPost()
      .pipe(
        map((posts: Post[]) => {
          posts.forEach((post: Post) => {
            var _post = post;
            _post['voteCount'] = sum(values(post.votes));
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

  upvote(postId: string) {
    if (this.user == null) {
      this.toast.error("You must login to upvote post");
    } else {
      let vote = this.userVote == 1 ? 0 : 1
      this.postsService.updateUserVote(postId, this.user.uid, vote)
    }
  }

  downvote(postId: string) {
    if (this.user == null) {
      this.toast.error("You must login to downvote post");
    } else {
      let vote = this.userVote == -1 ? 0 : -1
      this.postsService.updateUserVote(postId, this.user.uid, vote)
    }
  }
  isEditEnable: boolean = true; // to show and hide the edit button

  onEdit() {
    this.isEditEnable = !this.isEditEnable;
  }
}
