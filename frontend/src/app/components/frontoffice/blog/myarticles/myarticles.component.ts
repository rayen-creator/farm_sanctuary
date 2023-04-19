import { PostService } from 'src/app/core/services/post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/core/models/post';
import Swal from "sweetalert2";
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit, OnDestroy {
  posts: Post[];
  private tokenSubs: Subscription;
  decodedToken: DecodedToken;
  userId: string;
  constructor(private PostService: PostService,
    private auth: AuthService) {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.decodedToken = jwt_decode(token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
  }
 

  ngOnInit(): void {

    this.PostService.getPostperUser(this.userId).subscribe({
      next: (posts: any) => {
        this.posts = posts;
      },
      error: (err) => {
        throw err;
      }
    })
  }
  ngOnDestroy(): void {
    this.tokenSubs.unsubscribe();
  }
  deleteArticle(id: any) {
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
