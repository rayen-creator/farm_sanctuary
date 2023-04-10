import { error } from 'console';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription, map } from 'rxjs';
import { DecodedToken } from '../graphql/graphqlResponse/decodedToken';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import jwt_decode from "jwt-decode";
import { Comment } from '../models/comment';
import { addComment, getAllComment } from '../graphql/queries/graphql.comment.queries';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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


  addComment(comment: Comment, postId: any) {
    const userId = this.userId;
    const input = {
      content: comment.content
    };
    return this.apollo.mutate({
      mutation: addComment,
      variables: {
        input: input,
        postId: postId,
        userId: userId
      },refetchQueries:[
        {
          query:getAllComment,
          variables:{postId:postId}
        }
      ]
    }).subscribe({
      next: (res) => {

      },
      error: (error) => {
        throw error;

      }
    })
  }

  getAllcomment(postId:any){
    return this.apollo.watchQuery({
      query:getAllComment,
      variables:{postId:postId}
    }).valueChanges.pipe(
      map((res:any)=>{
        const comments=res.data.getAllComment;
        return comments as Comment[];
      })
    );
  }

}
