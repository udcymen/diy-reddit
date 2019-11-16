import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service'
import { Comment } from '../../models/comment.model';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

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
          return this.commentService.getRelatedComments('BHvbW8AdUa79QqklpH5B')
            .pipe(
              map((comments: Comment[]) => {
                comments.forEach((comment: Comment) => {
                  comment['reply'] = false;
                  comment['replyContent'] = '';
                })
                return comments;
              })
            )
        }
        )
      )
      .subscribe(comments => {
        this.comments = comments;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  reply(itemId: string) {
    this.comments.forEach(comment => {
      if (comment.id == itemId) {
        comment.reply = 'true';
      }
    })
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
