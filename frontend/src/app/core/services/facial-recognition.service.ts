import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacialRecognitionService {

  constructor(private http:HttpClient) { }


  addFaceID( faceImage: any) {
    return this.http.post(`${environment.flask}/upload`,faceImage);
  }
  checkFaceID(faceLogin:any) {
    return this.http.post(`${environment.flask}/recognize_face`,faceLogin);
  }
}