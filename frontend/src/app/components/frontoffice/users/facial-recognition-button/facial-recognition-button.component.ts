import { FacialRecognitionService } from './../../../../core/services/facial-recognition.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-facial-recognition-button',
  templateUrl: './facial-recognition-button.component.html',
  styleUrls: ['./facial-recognition-button.component.css']
})
export class FacialRecognitionButtonComponent implements OnInit {
  @Input() username: string;
  public webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private FacialRecognitionService: FacialRecognitionService,
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
    this.webcamImage = webcamImage;

    const imageData = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
    // Create a FormData object to send the image data in the request body
    const formData = new FormData();
    formData.append('image', imageData, `${this.username}.jpg`);

    this.FacialRecognitionService.addFaceID(formData).subscribe({
      next: () => {
        this.toaster.success("picture saved !", "success")
      },
      error: (err) => {
        throw err;
      }
    })

  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
