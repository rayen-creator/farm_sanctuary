import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { FacialRecognitionService } from 'src/app/core/services/facial-recognition.service';

@Component({
  selector: 'app-facial-login',
  templateUrl: './facial-login.component.html',
  styleUrls: ['./facial-login.component.css']
})
export class FacialLoginComponent implements OnInit {

  @Input() username: string
  selectedFile: any;
  imagePreview: string;
  public webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private auth:AuthService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  private dataURItoBlob(dataURI: string): Blob {
    // Convert data URI to Blob object
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  handleImage(webcamImage: WebcamImage): void {
    const request = {
      img_base64: webcamImage.imageAsBase64,
      login: "mohsen"
    }
    this.webcamImage = webcamImage;
    this.auth.loginFaceID(request);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


}
