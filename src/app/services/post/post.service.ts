import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


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

  getPost(postId: string): Observable<Post>{
    return this.postsCollection
    .doc(postId)
    .snapshotChanges()
    .pipe(
      map(a => {
        return <Post>{
          id: a.payload.id,
          ...a.payload.data() as Post
        }
      }),
    );
  }

  getAllPost(): Observable<Post[]> {
    return this.postsCollection
    .snapshotChanges()
    .pipe(map(snaps => {
      return snaps.map(snap => {
        return <Post>{
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        }
      })
    }))
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
