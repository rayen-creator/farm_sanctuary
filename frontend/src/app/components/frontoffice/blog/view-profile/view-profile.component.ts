import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { Comment } from 'src/app/core/models/comment';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit , OnDestroy {
  id: string;
  user: User;
  posts:Post[];
  comments:Comment[];
  private tokenSubs: Subscription;
  private userSubs:Subscription;
  private postSubs:Subscription;
  private commentSubs:Subscription;

  token: string;
  decodedToken: DecodedToken;
  userId: string;
  constructor(private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private postService:PostService,
    private commentService:CommentService,
    private auth: AuthService,) { }
 

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userSubs=this.userService.getUserById(this.id).subscribe({
      next: (res) => {
        this.user = res;
      }, error: (err) => {
        throw err;
      }
    });

    this.postSubs=this.postService.getPostperUser(this.id).subscribe({
      next: (res) => {
        this.posts=res;
      },
      error:(err)=>{
        throw err;
      }
    });
   this.commentSubs= this.commentService.getCommentPerUser(this.id).subscribe({
      next :(res)=>{
        this.comments=res;
      },
      error:(err)=>{
        throw err;
      }
    });
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
  }

  ngOnDestroy(): void {
   this.userSubs.unsubscribe();
   this.commentSubs.unsubscribe();
   this.postSubs.unsubscribe();
   this.tokenSubs.unsubscribe();
  }
}
