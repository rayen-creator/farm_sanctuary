import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Comment } from 'src/app/core/models/comment';
import { Post } from 'src/app/core/models/post';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import jwt_decode from "jwt-decode";
import { AuthService } from 'src/app/core/services/auth.service';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { BadgeService } from 'src/app/core/services/badge.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css']
})
export class DetailBlogComponent implements OnInit {
  id: string;
  post: Post;
  latestPosts: Post[];
  commentForm: FormGroup;
  comments: Comment[];
  private tokenSubs: Subscription;
  decodedToken: DecodedToken;
  userId: string;
  isEditmode: boolean = false;
  updateCommentForm: FormGroup;
  comment: Comment;
  isCommentActive: boolean = false
  isLiked: boolean;
  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private auth: AuthService,
    private userSerivce: UserService,
    private badgeService:BadgeService
  ) {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.decodedToken = jwt_decode(token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
  }


  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe({
      next: (post) => {
        this.post = post;

        this.userSerivce.getUserById(this.userId).subscribe({
          next: (user: User) => {
            const currentPost = user.likedPost.find((idPost) => idPost.id == this.id);
            if (currentPost) {
              this.isLiked = false;
            } else {
              this.isLiked = true;

            }
          },
          error: (err) => {
            throw err;
          }
        });
      },
      error: (err) => {
        throw err;
      }
    });


    this.postService.getAllposts().subscribe({
      next: (posts: Post[]) => {
        if (posts && posts.length > 0) {
          this.latestPosts = posts.slice(0, 3);
        } else {
          this.latestPosts = [];
        }
      },
      error: (err) => {
        throw err;
      }
    });
    this.commentService.getAllcomment(this.id).subscribe({
      next: (comments: any) => {
        this.comments = comments;
      },
      error: (err) => {
        throw err;
      }
    });


    this.commentForm = this.formBuilder.group({
      content: ['']
    });
  }

  addComment(form: any) {
    this.commentService.addComment(form, this.id).subscribe({
      next:()=>{
        this.badgeService.assignBadges(this.userId);

      },
      error:(err)=>{
        throw err;
      }
    });

    this.commentForm.controls['content'].setValue(null);
  }

  isComment() {
    if (this.isCommentActive) {
      this.isCommentActive = false;
    } else {
      this.isCommentActive = true;
    }
  }

  LikeButton() {
    if (this.isLiked) {
      this.postService.addLikeToPost(this.id).subscribe({
        next: () => {
          this.isLiked = false;
          this.badgeService.assignBadges(this.userId);
        },
        error: (err) => {
          throw err;
        }
      });

    } else {

      this.postService.dislikePost(this.id).subscribe({
        next: () => {
          this.isLiked = true;
        },
        error: (err) => {
          throw err;
        }
      });
    }
  }

}
