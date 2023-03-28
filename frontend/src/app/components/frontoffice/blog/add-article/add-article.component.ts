import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  blogText: string = '';
  safeHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  onBlogTextChanged() {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.blogText);
  }
}
