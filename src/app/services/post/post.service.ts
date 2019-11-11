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

  addPost(title, content, name){
    this.postsCollection.add({
      title: title,
      content: content,
      author: name,
      upVote: 0,
      downVote: 0
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
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
