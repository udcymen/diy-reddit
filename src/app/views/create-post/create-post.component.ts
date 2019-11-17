import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  newPostForm: FormGroup;
  user: User;
  subscription: Subscription;
  topics: string[] = ['Any', 'Game', 'Music', 'Movie', 'Funny']

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private postService: PostService,
    private toast: ToastrService,
    private auth: AuthService,
  ) {
    this.subscription = this.auth.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.newPostForm = this.fb.group({
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
    this.newPostForm.get('topic').setValue(e.target.value.split(": ")[1]);
  }

  get topic() { return this.newPostForm.get('topic').value }
  get title() { return this.newPostForm.get('title').value }
  get content() { return this.newPostForm.get('content').value }


  post() {
    if (this.user == null) {
      this.toast.error("You must login to create a new post");
    } else {
      this.postService.addPost(this.topic, this.title, this.content, this.user.uid).subscribe(postRef => {
        this.toast.success("Post successfully created with id: " + postRef.id);
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });
    }
  }

}
