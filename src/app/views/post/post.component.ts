import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, flatMap, switchMap, mergeMap, merge } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { PostService } from '../../services/post/post.service'
import { Post } from '../../models/post.model';
import { AuthService } from '../../services/auth/auth.service';
import { sum, values } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  voteCount: number;
  userVote: number = 0;
  postId: string;
  post: Post;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,
    private auth: AuthService,
    private postService: PostService,
  ) {


    // forkJoin([
    //   this.route.params.pipe(
    //     switchMap(params => {
    //       this.postId = params['id'];
    //       return this.postService.getPost(params['id']);
    //     })
    //   ),
    //   auth.user$
    // ]).subscribe((([post, user]: [Post, User]) => {
    //   console.log(post);
    //   console.log(user);
    //   this.voteCount = sum(values(this.post.votes));
    //   // this.user = result[1];
    //   if (this.post.votes && this.post.votes[this.user.uid]){
    //     this.userVote = this.post.votes[this.user.uid];
    //   }
    // }));

    this.route.params.pipe(
      switchMap(params => {
        this.postId = params['id'];
        return this.postService.getPost(params['id']);
      })
    ).subscribe(post => {
      this.post = post;
      this.voteCount = sum(values(this.post.votes));
    })

    auth.user$.subscribe(user => {
      this.user = user;
    });

    

    // this.postId = params['id'];
    // this.postService.getPost(params['id']);
    // this.postService.post$
    // .pipe(
    //   flatMap(post => this.post = post)
    // ).subscribe(post => {
    //   this.post = post;
    //   this.voteCount = sum(values(this.post.votes))
    // })
    // auth.user$.subscribe(user => {
    //   this.user = user;
    // });
    // this.userVote = post.votes[user.uid] != null ? post.votes[this.user.uid] : 0;

    // forkJoin(
    //   this.route.params.pipe(
    //     switchMap(params => {
    //       return this.postService.getPost(params['id']);
    //     })
    //   ),
    //   this.auth.getCurrentUser()
    // ).pipe(
    //   map(([first, second]) => {
    //     return { first, second };
    //   })
    // )

    



    // this.route.params
    // .pipe(
    //   switchMap(params => {
    //     return this.postService.getPost(params['id']);
    //   })
    // ).pipe(
    //   map(post => this.post = post),
    //   map(auth.user$.subscribe(user => this.user = user))
    // ).subscribe(() => {
    //   this.userVote = this.post.votes[this.user.uid] != null ? this.post.votes[this.user.uid] : 0;
    // })



    // const requests = [];
    // requests.push(this.route.params
    //   .pipe(
    //     switchMap(params => {
    //       return this.postService.getPost(params['id']);
    //     })
    //   ).subscribe(post => {
    //     this.post = post;
    //   })
    // )
    // requests.push(auth.user$.subscribe(user => this.user = user))

    // forkJoin(requests).subscribe( () => this.userVote = this.post.votes[this.user.uid] != null ? this.post.votes[this.user.uid] : 0)
    
  }

  ngOnInit() {
  }


  edit(){
    console.log("edit")
  }

  delete(){
    this.postService.deletePost(this.postId);
  }

  upvote() {
    if (this.user == null){
      this.toast.error("You must login to upvote post");
    } else{
      let vote = this.userVote == 1 ? 0 : 1
      this.postService.updateUserVote(this.postId, this.user.uid, vote)
    }
  }

  downvote() {
    if (this.user == null){
      this.toast.error("You must login to downvote post");
    } else{
      let vote = this.userVote == -1 ? 0 : -1
      this.postService.updateUserVote(this.postId, this.user.uid, vote)
    }
  }
}