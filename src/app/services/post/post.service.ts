import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { map } from 'rxjs/operators';


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

  getPost(postId: string){
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
    let data = {}
    data[userId] = vote
    this.postsCollection.doc(`${postId}`).update(data);
  }

  deletePost(id: string){
    this.postsCollection.doc(`${id}`).delete();
  }
}
