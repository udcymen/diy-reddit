import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { PostService } from '../../services/post/post.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';
import { UpvoteService } from '../../services/upvote/upvote.service'
import { AuthService } from '../../services/auth/auth.service';
import { sum, values } from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  post$: Observable<any>;
  postJson: any;
  userVote: number = 0;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private upvoteService: UpvoteService,
    private toast: ToastrService,
  ) {
    this.postsCollection = this.afs.collection('posts');
    const id: Observable<string> = route.params.pipe(map(p => p.id));

    this.afAuth.authState.subscribe( user => {
      if (user){
        this.userId = user.uid;
      }
      else{
        toast.error("You must login to vote");
      }
      id.subscribe(_id => {
        this.post$ = this.postsCollection.doc(_id).get();
        this.post$.subscribe( (res: any) => {
          let snapshot = res.data();
          snapshot.id = res.id;
          this.afs.collection('upvotes').doc(`${_id}`).get().subscribe(res => {
            let vote = res.data();
            if (this.userId){
              this.userVote = vote[this.userId]
            } 
            let upvote = values(vote).filter(vote => vote == 1)
            snapshot.upVote = upvote.length;
            snapshot.downVote = upvote.length - values(vote).length;
            this.postJson = snapshot;
          })
        })
      })
    });
  }

  ngOnInit() {
    
  }

  upvote(postId) {
    let vote = this.userVote == 1 ? 0 : 1
    this.upvoteService.updateUserVote(postId, this.userId, vote)
  }

  downvote(postId) {
    let vote = this.userVote == -1 ? 0 : -1
    this.upvoteService.updateUserVote(postId, this.userId, vote)
  }

}
