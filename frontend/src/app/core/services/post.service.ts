import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { addPost, deletePost, dislikePost, getAllPost, getPostsByUser, getpostById, likePost } from '../graphql/queries/post.queries';
import { Subscription, map } from 'rxjs';
import { Post } from '../models/post';
import { DecodedToken } from '../graphql/graphqlResponse/decodedToken';
import jwt_decode from "jwt-decode";
import { user } from '../graphql/queries/graphql.queries.user';

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
    const userId=this.userId;
    const input = {
      image: post.image,
      title: post.title,
      text: post.text,
      topic: post.topic,
      user: userId,
    }
    return this.apollo.mutate({
      mutation: addPost,
      variables: {
        input: input,
        file: selectedFile
      }, refetchQueries: [
        {
          query: getAllPost
        },
        {
          query:user,
          variables: { userId }
        },
        {
          query: getPostsByUser,
          variables: { userId }
        }
      ], context: {
        useMultipart: true
      }
    }).subscribe({
      next: () => {
        this.toastr.success('Post added successfully', 'Success', {
          progressBar: true
        }); this.router.navigate(['/myarticles']);
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

  getPostperUser(userId:any) {
    // const userId = this.userId;
    return this.apollo.watchQuery({
      query: getPostsByUser,
      variables: { userId }
    }).valueChanges.pipe(
      map((res: any) => {
        const posts = res.data.getPostsByUser;
        return posts as Post[];
      })
    )
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
  addLikeToPost(postId:any){
    const userId=this.userId;
    const id=userId;
    return this.apollo.mutate({
      mutation:likePost,
      variables:{
        userId:userId,
        postId:postId
      },refetchQueries: [
        {
          query: getAllPost
        },
        {
          query:user,
          variables: { id:id }
        }
      ]
    });
  }
  dislikePost(postId:any){
    const userId=this.userId;
    const id=userId;
    return this.apollo.mutate({
      mutation:dislikePost,
      variables:{
        userId:userId,
        postId:postId
      },refetchQueries: [
        {
          query: getAllPost
        },
        {
          query:user,
          variables: { id }
        }
      ]
    });
  }

  deletePost(id: any) {
    const userId = this.userId;
    
    return this.apollo.mutate({
      mutation: deletePost,
      variables: { id }, refetchQueries: [
        { query: getpostById, variables: { userId } },
        { query: getAllPost },
        { query: getPostsByUser, variables: { userId } },
        {
          query:user,
          variables: { userId }
        }
      ]
    }).subscribe({
      next: () => {
        this.toastr.success('Post deleted successfully', 'Success', {
          progressBar: true
        });
      },
      error: (error) => {
        throw error;
      }
    })

  }
}
