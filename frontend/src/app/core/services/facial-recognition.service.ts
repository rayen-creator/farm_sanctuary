import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class FacialRecognitionService {

  constructor(private apollo: Apollo) { }


  
  checkFaceID() {

  }
}
