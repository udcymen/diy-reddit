import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  newPostForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private ps: PostService,
    private auth: AuthService
  ) { 

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newPostForm = this.fb.group({
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

  get title() { return this.newPostForm.get('title').value }
  get content() { return this.newPostForm.get('content').value }

  post(){
    this.ps.addPost(this.title, this.content, this.auth.getCurrentUserName());
  }

}
