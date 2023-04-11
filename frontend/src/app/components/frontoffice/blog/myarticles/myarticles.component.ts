import { PostService } from 'src/app/core/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post';
import Swal from "sweetalert2";

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit {
  posts:Post[];
  constructor(private PostService:PostService) { }

  ngOnInit(): void {
    
    this.PostService.getPostperUser().subscribe({
      next:(posts:any)=>{
        this.posts=posts;
        console.log("posts",this.posts);
      },
      error:(err)=>{
        throw err;
      }
    })
  }

  deleteArticle(id:any){
    Swal.fire({
      title: 'Are you sure you want to delete this article ?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PostService.deletePost(id);
        // Swal.fire('deleted', 'article has been created successfully.', 'success');
      }
    });
  }

 

}
