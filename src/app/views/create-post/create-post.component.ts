import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../../services/posts/posts.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  newPostForm: FormGroup;
  topics: string[] = ['Any', 'Game', 'Music', 'Movie', 'Funny']

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private postsService: PostsService,
    private toast: ToastrService,
    private auth: AuthService,
  ) { 

  }

  ngOnInit() {
    this.createForm();
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


  post(){
    this.postsService.addPost(this.topic, this.title, this.content).subscribe(postRef => {
      this.toast.success("Post successfully created with id: " + postRef.id);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute});
    });
  }

}
