import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService } from '../../services/post/post.service'
import { Post } from '../../models/post.model';
import { Vote } from '../../models/vote.model';
import { Role } from '../../models/role.model';
import { Observable } from 'rxjs';
import { VoteService } from '../../services/vote/vote.service'
import { AuthService } from '../../services/auth/auth.service';
import { sum, values } from 'lodash';
import { RoleService } from '../../services/role/role.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';


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

  constructor(
    private route: ActivatedRoute,
    private voteService: VoteService,
    private toast: ToastrService,
    private auth: AuthService,
    private postService: PostService,
    private roleService: RoleService
  ) {
    
  }

  ngOnInit() {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    id.subscribe(_id => {
      this.postId = _id;
      this.post$ = this.postService.getPost(_id);
      this.vote$ = this.voteService.getVote(_id);
      this.vote$.subscribe(upvote => {
        this.voteCount = sum(values(upvote));
      })
    })
  }


  edit(){
    console.log(this.postService.canEdit(this.postId))
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