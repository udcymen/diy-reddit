import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore'
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<any[]>;
  postsJson: any[] = [];
  post: any;

  constructor(
    private afs: AngularFirestore, 
    private postService: PostService
  ) { 
    this.postsCollection = this.afs.collection('posts');
    this.posts = this.postsCollection.valueChanges();
    this.posts.subscribe(res => {
      this.postsJson = res;
    })
  }

  ngOnInit() {
  }

}
