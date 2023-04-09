import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/post.service';

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
  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
     ) { }
    
 
  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe({
      next: (post) => {
        this.post = post;
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
    
    this.commentForm = this.formBuilder.group({
      content: ['']
    });
  }

}
