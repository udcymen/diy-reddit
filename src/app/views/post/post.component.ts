import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService } from '../../services/post/post.service'
import { Post } from '../../models/post.model';
import { Vote } from '../../models/vote.model';
import { Observable } from 'rxjs';
import { VoteService } from '../../services/vote/vote.service'
import { AuthService } from '../../services/auth/auth.service';
import { sum, values } from 'lodash';
import { RoleService } from '../../services/role/role.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;
  postId: string;
  vote$: Observable<Vote>;
  voteCount: number;
  userVote: number = 0;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private voteService: VoteService,
    private toast: ToastrService,
    private auth: AuthService,
    private postService: PostService,
    private roleService: RoleService,
  ) {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    id.subscribe(_id => {
      this.postId = _id;
      this.postService.getPost(_id);
      this.vote$ = this.voteService.getVote(_id);
      this.vote$.subscribe(upvote => {
        this.voteCount = sum(values(upvote));
      })
    })
    auth.user$.subscribe(user=>{
      this.user=user;
      console.log("User: "+user);
    });
  }

  ngOnInit() {

  }


  edit(){
    console.log("edit")
  }

  delete(){
    console.log("delete")
  }

  // upvote(postId) {
  //   let vote = this.userVote == 1 ? 0 : 1
  //   this.voteService.updateUserVote(postId, this.userId, vote)
  // }

  // downvote(postId) {
  //   let vote = this.userVote == -1 ? 0 : -1
  //   this.voteService.updateUserVote(postId, this.userId, vote)
  // }
}