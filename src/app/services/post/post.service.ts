import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { firestore } from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.postsCollection = this.afs.collection('posts');
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
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
      })
    )
  }

  updateUserVote(postId: string, userId: string, vote: number): void {
    let data = {
      votes: {
        [userId]: vote
      }
    }
    this.postsCollection.doc(`${postId}`).set(data, { merge: true });
  }

  editPost(id: string, topic: string, title: string, content: string){
    return this.postsCollection
    .doc(id)
    .get()
    .pipe(
      switchMap(postDocument => {
        if (!postDocument || !postDocument.data()){
          throw new Error("Post not Found");
        } else{
          return from(
            this.postsCollection.doc(`${id}`)
            .set({
              topic: topic,
              title: title,
              content: content,
              updatedAt: this.timestamp
            }, { merge: true })
          )
        }
      })
    )
  }

  deletePost(id: string): Observable<void>{
    return this.postsCollection
    .doc(id)
    .get()
    .pipe(
      switchMap(postDocument => {
        if (!postDocument || !postDocument.data()){
          throw new Error("Post not Found");
        } else{
          return from(
            this.postsCollection.doc(`${id}`)
            .delete()
          )
        }
      })
    )
  }
}
