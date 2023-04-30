import { FacialRecognitionService } from './../../../../core/services/facial-recognition.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {  ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-facial-recognition-button',
  templateUrl: './facial-recognition-button.component.html',
  styleUrls: ['./facial-recognition-button.component.css']
})
export class FacialRecognitionButtonComponent implements OnInit {
  selectedFile: any;
  imagePreview: string;
  webcamImageCaptured: boolean = false;
  public webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private sanitizer: DomSanitizer,
    private FacialRecognitionService: FacialRecognitionService,
    private toaster:ToastrService
  ) { }

  ngOnInit(): void {
  }
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    // console.info('Saved webcam image', webcamImage.imageAsDataUrl);
    this.webcamImageCaptured = true;
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  handleFileInput(event: Event) {
    // @ts-ignore
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    console.log(this.selectedFile)
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
    // call your service method to update user image
  }
  saveChanges() {
    if (this.selectedFile != "" && this.selectedFile != null) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
       

      };
    }else if (this.webcamImageCaptured){
     
    }

  }
}
