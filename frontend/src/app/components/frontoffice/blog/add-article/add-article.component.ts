import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Quill from 'quill';
import { Subscription } from 'rxjs';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { AuthService } from 'src/app/core/services/auth.service';
import { BadgeService } from 'src/app/core/services/badge.service';
import { PostService } from 'src/app/core/services/post.service';
import { Customvalidator } from 'src/app/core/utils/custom-validator';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  blogText: string = '';
  safeHtml: SafeHtml;
  articleForm:FormGroup;
  selectedFile: File;
  private tokenSubs: Subscription;
  decodedToken: DecodedToken;
  userId: string;
  constructor(
    private sanitizer: DomSanitizer,
    private fb:FormBuilder,
    private postService:PostService,
    private badgeService:BadgeService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService) {
      this.tokenSubs = this.auth.getToken().subscribe((token) => {
        this.decodedToken = jwt_decode(token) as DecodedToken;
        this.userId = this.decodedToken.id;
      });
     }

  ngOnInit(): void { 
    // Initialize the form using FormBuilder
    this.articleForm = this.fb.group({
      title: ['',Validators.required],
      text: ['',Validators.required],
      topic:['',Validators.required],
      image:['',Validators.required]
    });
    const quill = new Quill('#text', {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['clean']
        ]
      },
      placeholder: 'Compose your content...',
      theme: 'snow'
    });

  }

  handleFile(event:Event){
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.selectedFile=file
      // this.articleForm.patchValue({
      //   image: file
      // });
    }
  }

  onFormSubmit(articleForm:any) {
    this.postService.addPost(articleForm,this.selectedFile).subscribe({
      next: () => {
        this.toastr.success('Post added successfully', 'Success', {
          progressBar: true
        }); this.router.navigate(['/myarticles']);
        this.badgeService.assignBadges(this.userId);

      },
      error: (error) => {
        throw error;
      }
    });
  }

  Valid(controlname: any, articleForm: any) {
    return Customvalidator.Valid(controlname, articleForm)

  }

  onBlogTextChanged() {
    console.log('onBlogTextChanged() called'); // Add this line

    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.blogText);
  }

}
