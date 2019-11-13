import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote/vote.service'
import { AuthService } from '../../services/auth/auth.service';
import { PostService } from '../../services/post/post.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  posts$: Observable<Post[]>;
  postsJson: any[] = [];

  userVote: number = 0;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private voteService: VoteService,
    private postService: PostService
  ) { 

  }

  ngOnInit() {
    this.posts$ = this.postService.getAllPost();
  }

  upvote(postId) {
    let vote = this.userVote == 1 ? 0 : 1
    this.voteService.updateUserVote(postId, this.auth.getCurrentUserName(), vote)
  }

  downvote(postId) {
    let vote = this.userVote == -1 ? 0 : -1
    this.voteService.updateUserVote(postId, this.auth.getCurrentUserName(), vote)
  }

  openPost(postId){
    return this.router.navigate([`/post/${postId}`]);
  }
}
