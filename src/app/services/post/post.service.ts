import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;

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
      })
    )
  }

  updateUserVote(postId: string, userId: string, vote: number): void {
    let data = {
      votes: {
        [userId]: vote
      }
    }
    this.postsCollection.doc(`${postId}`).update(data);
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
