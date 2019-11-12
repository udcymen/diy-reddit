import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';
import { UpvoteService } from '../../services/upvote/upvote.service'
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  postsJson: any[] = [];

  userVote: number = 0;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private upvoteService: UpvoteService
  ) { 
    this.postsCollection = this.afs.collection('posts');
    this.getAllPosts();
  }

  ngOnInit() {
  }

  getAllPosts(){
    this.postsCollection.get().subscribe(querySnapshot => {
      querySnapshot.forEach(QueryDocumentSnapshot => {
        let snapshot = QueryDocumentSnapshot.data();
        snapshot.id = QueryDocumentSnapshot.id;
        this.postsJson.push(snapshot);
      })
    })
  }

  upvote(postId) {
    let vote = this.userVote == 1 ? 0 : 1
    this.upvoteService.updateUserVote(postId, this.auth.getCurrentUserName(), vote)
  }

  downvote(postId) {
    let vote = this.userVote == -1 ? 0 : -1
    this.upvoteService.updateUserVote(postId, this.auth.getCurrentUserName(), vote)
  }

  openPost(postId){
    return this.router.navigate([`/post/${postId}`]);
  }
}
