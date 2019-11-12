import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {map} from 'rxjs/operators';
import { PostService } from '../../services/post/post.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Post } from '../../models/post.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postsCollection: AngularFirestoreCollection<Post>;
  post$: Observable<any>;
  postJson: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private ps: PostService
  ) {
    this.postsCollection = this.afs.collection('posts');
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe(_id => {
      this.post$ = this.postsCollection.doc(_id).get();
      this.post$.subscribe( (res: any) => {
        this.postJson = res.data();
      })
    })
  }

  ngOnInit() {
    // this.post$ = this.route.paramMap.pipe(
    //   switchMap(
    //     (params: ParamMap) => this.postsCollection.doc(params.get('id')).get()
    //   )
    // );
    // this.post$.subscribe(res => {
    //   this.postJson = res;
    // })
  }

}