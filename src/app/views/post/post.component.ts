import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post/post.service'
import { CommentService } from '../../services/comment/comment.service'
import { AuthService } from '../../services/auth/auth.service';
import { sum, values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  voteCount: number;
  userVote: number = 0;
  postComment = '';
  postId: string;
  post: any;
  user: User;
  comments?: any[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private auth: AuthService,
    private postService: PostService,
    private commentService: CommentService
  ) {

  }

  ngOnInit() {
    this.subscription = this.auth.user$
      .pipe(
        map(user => this.user = user),
        switchMap(() => {
          return this.activatedRoute.params.pipe(
            switchMap(params => {
              this.postId = params['id'];
              return this.postService.getPost(params['id']);
            })
          )
        })
      )
      .pipe(
        map(post => {
          if (post.votes) {
            post['voteCount'] = sum(values(post.votes));
            if (this.user) {
              post['userVote'] = post.votes[this.user.uid];
            } else {
              post['userVote'] = 0;
            }
          } else {
            post['voteCount'] = 0;
          }
          this.post = post;
        }),
        switchMap(() => {
          return this.commentService.getRelatedComments(this.postId)
        })
      )
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  edit() {
    return this.router.navigate([`/post/${this.postId}/edit`]);
  }

  delete() {
    this.postService.deletePost(this.postId).subscribe(postRef => {
      this.toast.success("Post successfully deleted with id: " + this.postId);
      this.router.navigate(['/home']);
    }, error => this.toast.error(error.message));
  }

  upvote(postId: string, userVote: number) {
    if (this.user == null) {
      this.toast.error("You must login to upvote post");
    } else {
      let vote = this.userVote == 1 ? 0 : 1
      this.postService.updateUserVote(this.postId, this.user.uid, vote)
    }
  }

  downvote(postId: string, userVote: number) {
    if (this.user == null) {
      this.toast.error("You must login to downvote post");
    } else {
      let vote = this.userVote == -1 ? 0 : -1
      this.postService.updateUserVote(this.postId, this.user.uid, vote)
    }
  }

  commentPost(itemId: string, content: string) {
    if (this.user == null) {
      this.toast.error("You must login to create a new post");
    } else {
      this.commentService.addComment(content, itemId, this.user.uid).subscribe(commentRef => {
        this.postComment = '';
        this.toast.success("Comment successfully created with id: " + commentRef.id);
      });
    }
  }
}