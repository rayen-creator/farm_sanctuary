import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { Post } from 'src/app/core/models/post';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css']
})
export class LatestnewsComponent implements OnInit {
  posts:Post[];
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAllposts().subscribe({
      next: (posts) => {
        this.posts = posts;

      },
      error:(error)=>{
        throw error;
      }
    })
  }

}
