import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  private postDoc: AngularFirestoreDocument<Post>;

  constructor(
    private afs: AngularFirestore,
    private toast: ToastrService, 
  ) { 
    this.postsCollection = this.afs.collection('posts');
  }

  addPost(title, content, name){
    this.postsCollection.add({
      title: title,
      content: content,
      author: name
    })
    .then(function(docRef) {
      this.toast.success("Post successfully created");
    })
    .catch(function(error) {
      this.toast.error("Erro when creating post");
    });
  }

  updatePost(id, update){
    this.postDoc = this.postsCollection.doc(`${id}`);
    this.postDoc.update(update);
  }

  deletePost(id){
    this.postDoc = this.postsCollection.doc(`${id}`);
    this.postDoc.delete();
  }

}
