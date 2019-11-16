import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommentService } from '../../services/comment/comment.service'
import { Comment } from '../../models/comment.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  editComment: string;

  constructor() {
  }

  ngOnInit() {

  }

}
