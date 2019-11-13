import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService } from '../../services/post/post.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { Vote } from '../../models/vote.model';
import { Observable } from 'rxjs';
import { VoteService } from '../../services/vote/vote.service'
import { AuthService } from '../../services/auth/auth.service';
import { filter, conforms, sum, values } from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;
  vote$: Observable<Vote>;
  voteCount: number;
  userVote: number = 0;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private voteService: VoteService,
    private toast: ToastrService,
    private postService: PostService,
  ) {
    
    // this.afAuth.authState.subscribe( user => {
    //   if (user){
    //     this.userId = user.uid;
    //   }
    //   else{
    //     toast.error("You must login to vote");
    //   }
    //   id.subscribe(_id => {
    //     this.post$ = this.postsCollection.doc(_id).get();
    //     this.post$.subscribe( (res: any) => {
    //       let snapshot = res.data();
    //       snapshot.id = res.id;
    //       this.afs.collection('upvotes').doc(`${_id}`).get().subscribe(res => {
    //         let vote = res.data();
    //         if (this.userId){
    //           this.userVote = vote[this.userId]
    //         } 
    //         let upvote = values(vote).filter(vote => vote == 1)
    //         snapshot.upVote = upvote.length;
    //         snapshot.downVote = upvote.length - values(vote).length;
    //         this.postJson = snapshot;
    //       })
    //     })
    //   })
    // });
  }

  ngOnInit() {
    const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    id.subscribe(_id => {
      this.post$ = this.postService.getPost(_id);
      this.vote$ = this.voteService.getVote(_id);
      console.log(this.vote$)
      this.vote$.subscribe(upvote => {
        console.log(upvote);
        this.voteCount = sum(values(upvote));
      })
    })
  }

  upvote(postId) {
    let vote = this.userVote == 1 ? 0 : 1
    this.voteService.updateUserVote(postId, this.userId, vote)
  }

  downvote(postId) {
    let vote = this.userVote == -1 ? 0 : -1
    this.voteService.updateUserVote(postId, this.userId, vote)
  }
}