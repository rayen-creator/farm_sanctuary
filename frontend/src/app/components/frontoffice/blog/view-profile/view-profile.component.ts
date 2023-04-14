import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/core/models/comment';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  id: string;
  user: User;
  posts:Post[];
  comments:Comment[];
  constructor(private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private postService:PostService,
    private commentService:CommentService) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe({
      next: (res) => {
        this.user = res;
      }, error: (err) => {
        throw err;
      }
    });

    this.postService.getPostperUser(this.id).subscribe({
      next: (res) => {
        this.posts=res;
      },
      error:(err)=>{
        throw err;
      }
    });
    this.commentService.getCommentPerUser(this.id).subscribe({
      next :(res)=>{
        this.comments=res;
      },
      error:(err)=>{
        throw err;
      }
    })
  }

}
