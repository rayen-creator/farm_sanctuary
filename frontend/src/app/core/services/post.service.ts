import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { addPost, getAllPost, getpostById } from '../graphql/queries/post.queries';
import { Subscription, map } from 'rxjs';
import { Post } from '../models/post';
import { DecodedToken } from '../graphql/graphqlResponse/decodedToken';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private tokenSubs: Subscription;
  decodedToken: DecodedToken;
  userId: string;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService) {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.decodedToken = jwt_decode(token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
  }

  addPost(post: Post, selectedFile: File) {

    const input = {
      image: post.image,
      title: post.title,
      text: post.text,
      topic: post.topic,
      user: this.userId,
    }
    return this.apollo.mutate({
      mutation: addPost,
      variables: {
        input: input,
        file: selectedFile
      }, refetchQueries: [
        {
          query: getAllPost
        }
      ], context: {
        useMultipart: true
      }
    }).subscribe({
      next: () => {
        this.toastr.success('Post added successfully');
        this.router.navigate(['/latestnew']);
      },
      error: (error) => {
        throw error;
      }
    })
  }

  getAllposts() {
    return this.apollo.watchQuery({
      query: getAllPost
    }).valueChanges.pipe(
      map((res: any) => {
        const posts = res.data.getAllPost;
        return posts as Post[];
      })
    )
  }

  getPostperUser() {

  }

  getPostById(id: any) {
    return this.apollo.watchQuery({
      query: getpostById,
      variables: { id }
    }).valueChanges.pipe(
      map((res: any) => {
        const posts = res.data.getpostById;
        return posts as Post;
      })
    )
  }

  updatePost() {

  }

  deletePost() {

  }
}
