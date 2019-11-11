import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  private postDoc: AngularFirestoreDocument<Post>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.postsCollection = this.afs.collection('posts');
  }

  addPost(post){
    this.postsCollection.add(post);
  }

  updatePost(id, update){
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    this.postDoc.update(update);
  }

  deletePost(id){
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    this.postDoc.delete();
  }

}
