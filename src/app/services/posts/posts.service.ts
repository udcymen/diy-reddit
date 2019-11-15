import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { isEmpty, intersection } from 'lodash';
import { firestore } from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsCollection: AngularFirestoreCollection<Post>;

  constructor(
    private afs: AngularFirestore,
    private toast: ToastrService, 
  ) { 
    this.postsCollection = this.afs.collection('posts');
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
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

  updateUserVote(postId: string, userId: string, vote: number): void {
    let data = {
      votes: {
        [userId]: vote
      }
    }
    this.postsCollection.doc(`${postId}`).set(data, { merge: true });
  }

  addPost(topic: string, title: string, content: string, userId: string): Observable<any>{
    return from(
      this.postsCollection.add({
        title: title,
        content: content,
        topic: topic,
        author: userId,
        createdAt: this.timestamp,
        updatedAt: this.timestamp,
        votes: {}
      })
    )
  }
}
