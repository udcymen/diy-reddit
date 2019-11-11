import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  postsJson: any[] = [];

  constructor(
    private afs: AngularFirestore,
    private router: Router,
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

  openPost(postId){
    return this.router.navigate([`/post/${postId}`]);
  }
}
