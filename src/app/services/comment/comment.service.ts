import { map, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr';
import { Comment } from '../../models/comment.model'
import { Injectable } from '@angular/core';
import { firestore } from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentsCollection: AngularFirestoreCollection<Comment>;

  constructor(
    private toast: ToastrService,
    private afs: AngularFirestore,
    private auth: AuthService,
  ) {
    this.commentsCollection = this.afs.collection('comments');
  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  addComment(content: string, itemId: string, userId: string) {
    return from(
      this.commentsCollection.add({
        content: content,
        commentedOn: itemId,
        author: userId,
        votes: {},
        createdAt: this.timestamp,
        updatedAt: this.timestamp,
      })
    )
  }

  getComment(id: string): Observable<Comment> {
    return this.commentsCollection
      .doc(id)
      .snapshotChanges()
      .pipe(
        map(a => {
          return <Comment>{
            id: a.payload.id,
            ...a.payload.data() as Comment
          }
        })
      )
  }

  getRelatedComments(relatedId: string): Observable<Comment[]> {
    return this.afs.collection('comments', ref => ref.where('commentedOn', '==', relatedId))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          return snaps.map(snap => {
            return <Comment>{
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            }
          })
        }
        ))
  }

  editComment(id: string, content: string) {
    return this.commentsCollection
      .doc(id)
      .get()
      .pipe(
        switchMap(commentDocument => {
          if (!commentDocument || !commentDocument.data()) {
            throw new Error("Post not Found");
          } else {
            return from(
              this.commentsCollection.doc(`${id}`)
                .set({
                  content: content,
                  updatedAt: this.timestamp
                }, { merge: true })
            )
          }
        })
      )
  }

  deleteComment(id: string): Observable<void> {
    return this.commentsCollection
      .doc(id)
      .get()
      .pipe(
        switchMap(postDocument => {
          if (!postDocument || !postDocument.data()) {
            throw new Error("Post not Found");
          } else {
            return from(
              this.commentsCollection.doc(`${id}`)
                .delete()
            )
          }
        })
      )
  }
}
