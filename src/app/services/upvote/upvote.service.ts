import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  constructor(
    private afs: AngularFirestore,
  ) { 

  }

  updateUserVote(postId, userId, vote): void {
    // Creates or updates user's vote
    let data = {}
    data[userId] = vote
    this.afs.collection('upvotes').doc(`${postId}`).update(data);
  }
}
