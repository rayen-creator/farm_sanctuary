import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { addFaceID } from '../graphql/queries/auth.queries';

@Injectable({
  providedIn: 'root'
})
export class FacialRecognitionService {

  constructor(private apollo: Apollo) { }


  addFaceID(id: any, faceImage: any) {
    const input={
      id: id,
      faceImage: faceImage
    }
    return this.apollo.mutate({
      mutation: addFaceID,
      variables: {
        input:input
      }
    });
  }
  checkFaceID() {

  }
}
