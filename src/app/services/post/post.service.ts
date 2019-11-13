import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { isEmpty, intersection } from 'lodash';
import { VoteService } from '../vote/vote.service'


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  user: User;
  post$: Observable<Post>;
  post: Post;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private voteService: VoteService,
    private toast: ToastrService, 
  ) { 
    this.postsCollection = this.afs.collection('posts');
  }

  getPost(postId: string){
    this.post$ = this.postsCollection
    .doc(postId)
    .snapshotChanges()
    .pipe(
      map(a => {
        return <Post>{
          id: a.payload.id,
          ...a.payload.data() as Post
        }
      }),
    )
    this.post$.subscribe(post => this.post = post);
  }

    // ///// Authorization Logic /////

  // canDelete(postId: string, userId: string): boolean {
  //   const allowed = ['admin']
  //   return this.matchingRole(allowed)
  // }

  // /// Helper to determine if any matching roles exist
  // private matchingRole(allowedRoles): boolean {
  //   return !isEmpty(intersection(allowedRoles, this.userRoles))
  // }


  // //// User Actions

  // editPost(post, newData) {
  //   if ( this.canEdit ) {
  //     return this.db.object('posts/' + post.$key).update(newData)
  //   }
  //   else console.log('action prevented!')
  // }

  // deletePost(key) {
  //   if ( this.canDelete ) {
  //     return this.db.list('posts/' + key).remove()
  //   }
  //   else console.log('action prevented!')
  // }
}
