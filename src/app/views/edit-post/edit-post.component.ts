import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../../services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { PostService } from '../../services/post/post.service'
import { map, flatMap, switchMap, mergeMap, merge } from 'rxjs/operators';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  postEditForm: FormGroup;
  topics: string[] = ['Any', 'Game', 'Music', 'Movie', 'Funny']
  postId: string;
  post: Post;
  user: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private toast: ToastrService,
    private auth: AuthService,
    private postService: PostService,
  ) { 
    this.activatedRoute.params.pipe(
      switchMap(params => {
        this.postId = params['id'];
        return this.postService.getPost(params['id']);
      })
    ).subscribe(post => {
      this.postEditForm.setValue({
        topic: post.topic,
        title: post.title,
        content: post.content
      })
    })

    auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postEditForm = this.fb.group({
      'topic': ['', [
        Validators.required
        ]
      ],
      'title': ['', [
        Validators.required
        ]
      ],
      'content': ['', [
        Validators.required
        ]
      ]
    });
  }

  changeTopic(e) {
    this.postEditForm.get('topic').setValue(e.target.value.split(": ")[1]);
  }

  get topic() { return this.postEditForm.get('topic').value }
  get title() { return this.postEditForm.get('title').value }
  get content() { return this.postEditForm.get('content').value }

  submit(){
    console.log("submit");
  }

}
