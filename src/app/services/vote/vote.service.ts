import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { Vote } from '../../models/vote.model';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private votesCollection: AngularFirestoreCollection<Vote>;
  private upvoteCollection: AngularFirestoreCollection<Vote>;
  private downCollection: AngularFirestoreCollection<Vote>;

  constructor(
    private afs: AngularFirestore,
  ) { 
    this.votesCollection = this.afs.collection('votes');
  }

  getVote(itemId: string): Observable<Vote>{
    return this.votesCollection
    .doc(itemId)
    .snapshotChanges()
    .pipe(
      map(a => {
        return <Vote>{
          id: a.payload.id,
          ...a.payload.data() as Vote
        }
      }),
    );
  }

  updateUserVote(postId: string, userId: string, vote: number): void {
    let data = {}
    data[userId] = vote
    this.votesCollection.doc(`${postId}`).update(data);
  }
}
