import { FacialRecognitionService } from './../../../../core/services/facial-recognition.service';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  selectedFile: any;
  imagePreview: string;
  webcamImageCaptured: boolean = false;
  public webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private sanitizer: DomSanitizer,
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
        // this.FacialRecognitionService.addFaceID().subscribe({
        //   next:()=>{
        //     this.toaster.success("picture saved !","success")
        //   },
        //   error:(err)=>{
        //     throw err;
        //   }
        // })

      };
    } else if (this.webcamImageCaptured) {
      const imageData = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
      // Create a FormData object to send the image data in the request body
      const formData = new FormData();
      formData.append('image', imageData, `${this.username}.jpg`);

      // console.log("webcamImage", formData.get('image'));
      this.FacialRecognitionService.addFaceID(formData).subscribe({
        next: () => {
          this.toaster.success("picture saved !", "success")
        },
        error: (err) => {
          throw err;
        }
      })
    }
  }
}
