import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Quill from 'quill';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  blogText: string = '';
  safeHtml: SafeHtml;
  articleForm:FormGroup;

  constructor(private sanitizer: DomSanitizer,private fb:FormBuilder,private postService:PostService) { }

  ngOnInit(): void { 
    // Initialize the form using FormBuilder
    this.articleForm = this.fb.group({
      title: [''], // Add a FormControl for the "Title" input field
      text: [''],
      topic:['']
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

    // quill.on('text-change', (delta, oldDelta, source) => {
    //   console.log('Text changed:', delta);
    //   // Custom logic for handling text change event
    // });

    // quill.on('selection-change', (range, oldRange, source) => {
    //   console.log('Selection changed:', range);
    //   // Custom logic for handling selection change event
    // });
  }

  onFormSubmit(articleForm:any) {
    console.log(articleForm);
    this.postService.addPost(articleForm);
    // event.preventDefault(); // Prevent form submission
    // // Perform any other necessary actions on form submission
  }

  onBlogTextChanged() {
    console.log('onBlogTextChanged() called'); // Add this line

    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.blogText);
  }

}
