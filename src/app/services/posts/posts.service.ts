import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { Vote } from '../../models/vote.model';
import { ToastrService } from 'ngx-toastr';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { isEmpty, intersection } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsCollection: AngularFirestoreCollection<Post>;
  user: User;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private toast: ToastrService, 
  ) { 
    this.postsCollection = this.afs.collection('posts');
    this.auth.user$.subscribe(user => this.user = user);
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
    this.postsCollection.doc(`${postId}`).update(data);
  }

  addPost(topic: string, title: string, content: string): Observable<any>{
    if (this.user == null) {
      this.toast.error("You must login to create a new post");
    }
    return from(
      this.postsCollection.add({
        title: title,
        content: content,
        topic: topic,
        author: this.user.uid,
        votes: {}
      })
    )
  }
}
