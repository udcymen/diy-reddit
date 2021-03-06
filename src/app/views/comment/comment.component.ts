import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service'
import { Comment } from '../../models/comment.model';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { sum, values } from 'lodash';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() itemId: string;

  comments?: any[];
  user: User;
  subscription: Subscription;

  constructor(
    private commentService: CommentService,
    private toast: ToastrService,
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.auth.user$
      .pipe(
        map(user => this.user = user),
        switchMap(() => {
          return this.commentService.getRelatedComments(this.itemId)
            .pipe(
              map((comments: Comment[]) => {
                comments.forEach((comment: Comment) => {
                  comment['reply'] = false;
                  comment['replyContent'] = '';
                  if (values(comment.votes).length != 0) {
                    comment['voteCount'] = sum(values(comment.votes));
                    if (this.user) {
                      comment['userVote'] = comment.votes[this.user.uid];
                    } else {
                      comment['userVote'] = 0;
                    }
                  } else {
                    comment['voteCount'] = 0;
                  }
                })
                return comments;
              })
            )
        })
      )
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  upvote(commentId: string, userVote: number) {
    if (this.user == null) {
      this.toast.error("You must login to upvote post");
    } else {
      let vote = userVote == 1 ? 0 : 1
      this.commentService.updateUserVote(commentId, this.user.uid, vote)
    }
  }

  downvote(commentId: string, userVote: number) {
    if (this.user == null) {
      this.toast.error("You must login to downvote post");
    } else {
      let vote = userVote == -1 ? 0 : -1
      this.commentService.updateUserVote(commentId, this.user.uid, vote)
    }
  }

  commentOn(itemId: string) {
    if (this.user == null) {
      this.toast.error("You must login to create a new post");
    } else {
      this.comments.forEach(comment => {
        if (comment.id === itemId) {
          this.commentService.addComment(comment.replyContent, itemId, this.user.uid).subscribe(commentRef => {
            comment.replyContent = ''
            comment.reply = false;
            this.toast.success("Comment successfully created with id: " + commentRef.id);
          });
        }
      })
    }
  }
}
