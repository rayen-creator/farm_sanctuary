import { Component, OnInit } from '@angular/core';
import { Feedback } from "../../../../core/models/feedback";
import Swal from 'sweetalert2'
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackFormComponent implements OnInit {
  TitleAndSubjectDetails!: FormGroup;
  RatingAndCategoryDetails!: FormGroup;
  ContentDetails!: FormGroup;
  title_step = false;
  category_step = false;
  content_step = false;
  step = 1;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
   ) {

  }

  ngOnInit(): void {
    this.TitleAndSubjectDetails = this.formBuilder.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
    });

    this.RatingAndCategoryDetails = this.formBuilder.group({
      category: ['', Validators.required],
      rating: ['', Validators.required],
    });

    this.ContentDetails = this.formBuilder.group({
        content: ['', Validators.compose([Validators.required, this.badWordValidator(['bad', 'stupid','fake'])])],
       
    });
  }
  get Title() { return this.TitleAndSubjectDetails.controls; }

  get category() { return this.RatingAndCategoryDetails.controls; }

  get content() { return this.ContentDetails.controls; }

  badWordValidator(badWords: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.value.toLowerCase();
      const hasBadWord = badWords.some((word) => input.includes(word.toLowerCase()));
  
      return hasBadWord ? { badWord: true } : null;
    };
  }

  next() {

    if (this.step == 1) {
      this.title_step = true;
      if (this.TitleAndSubjectDetails.invalid) { return }
      this.step++
    }

    else if (this.step == 2) {
      this.category_step = true;
      if (this.RatingAndCategoryDetails.invalid) { return }
      this.step++;
    }



  }

  previous() {
    this.step--

    if (this.step == 1) {
      this.title_step = false;
    }
    if (this.step == 2) {
      this.category_step = false;
    }

  }

  onSubmit() {
    if (this.step == 3) {
      this.content_step = true;
      if (this.ContentDetails.invalid) { return }
    }
    Swal.fire({
      title: 'Are you sure you want to add this feedback?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add',
    }).then((result) => {
      if (result.isConfirmed) {
        let titleFeedback = this.TitleAndSubjectDetails.value;
        let categoryFeedback = this.RatingAndCategoryDetails.value;
        let contentFeedback = this.ContentDetails.value;

        const feedback = {
          title: titleFeedback.title,
          subject: titleFeedback.subject,
          content: contentFeedback.content,
          rating: parseInt(categoryFeedback.rating),
          category: categoryFeedback.category,
        };

        this.feedbackService.createFeedback(feedback);

      }
    });
  }
}

