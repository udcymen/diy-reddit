import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, flatMap, switchMap, mergeMap, merge } from 'rxjs/operators';
import { forkJoin, Observable, from } from 'rxjs';
import { PostService } from '../../services/post/post.service'
import { User } from '../../models/user.model';
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
  comment: Comment;
  user: User;

  constructor(
    private toast: ToastrService,
    private afs: AngularFirestore,
    private auth: AuthService,
  ) { 
    auth.user$.subscribe(user => {
      this.user = user;
      this.commentsCollection = this.afs.collection('comments');
    });

  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  addComment(content: string, itemId: string, userId: string){
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

  getComment(id: string): Observable<Comment>{
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

  editComment(id: string, content: string){
    return this.commentsCollection
    .doc(id)
    .get()
    .pipe(
      switchMap(commentDocument => {
        if (!commentDocument || !commentDocument.data()){
          throw new Error("Post not Found");
        } else{
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

  deleteComment(id: string): Observable<void>{
    return this.commentsCollection
    .doc(id)
    .get()
    .pipe(
      switchMap(postDocument => {
        if (!postDocument || !postDocument.data()){
          throw new Error("Post not Found");
        } else{
          return from(
            this.commentsCollection.doc(`${id}`)
            .delete()
          )
        }
      })
    )
  }
}
