import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../../services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';
import { PostService } from '../../services/post/post.service'
import { map, flatMap, switchMap, mergeMap, merge } from 'rxjs/operators';
import { Post } from '../../models/post.model';


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

  cancle(){
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
  }

  submit(){
    this.postService.editPost(this.postId, this.topic, this.title, this.content).subscribe(postRef => {
      this.toast.success("Post successfully updated with id: " + this.postId);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute});
    }, error => this.toast.error(error.message));
  }

}
