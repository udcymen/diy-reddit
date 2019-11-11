import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore'
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  postsJson: any[] = [];

  constructor(
    private afs: AngularFirestore
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
}
