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
export class PostsService {

  postsCollection: AngularFirestoreCollection<Post>;
  user: User;
  editOrDelete: Boolean;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private voteService: VoteService,
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

  addPost(topic: string, title: string, content: string){
    const _this = this;
    if (this.user == null) {
      this.toast.error("You must login to create a new post");
    }
    this.postsCollection.add({
      title: title,
      content: content,
      topic: topic,
      author: this.user.uid
    })
    .then(function(docRef) {
      _this.voteService.createVote(docRef.id)
      _this.toast.success("Post successfully created");
    })
    .catch(function(error) {
      _this.toast.error("Error while logging in");
    });
  }
}
