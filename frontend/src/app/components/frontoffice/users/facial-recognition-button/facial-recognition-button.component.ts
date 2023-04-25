import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  webcamImageCaptured:boolean=false;
  public webcamImage: WebcamImage  ;
  private trigger: Subject<void> = new Subject<void>();
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  triggerSnapshot(): void {
    this.trigger.next();
   }
   handleImage(webcamImage: WebcamImage): void {
    console.info('Saved webcam image', webcamImage);
    this.webcamImageCaptured=true;
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
}
