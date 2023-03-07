
import { Component, OnInit } from '@angular/core';
import {feedbacks} from "../../../../core/graphql/graphql.queries";
import {Apollo, gql} from "apollo-angular";
import {Feedback} from "../../../../core/models/feedback";
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackFormComponent implements OnInit {

    title = 'FeedBack-code';
 

    TitleAndSubjectDetails!: FormGroup;
    RatingAndCategoryDetails!: FormGroup;
    ContentDetails!: FormGroup;
    title_step = false;
    category_step = false;
    content_step = false;
    step = 1;
  
  feedbackList: Feedback[];
    constructor(private apollo: Apollo ,private formBuilder: FormBuilder ) {
    
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
        content: ['', Validators.required],
       
    });
    }
    get Title() { return this.TitleAndSubjectDetails.controls; }
    
    get category() { return this.RatingAndCategoryDetails.controls; }
  
    get content() { return this.ContentDetails.controls; }

    next(){
 
      if(this.step==1){
            this.title_step = true;
            if (this.TitleAndSubjectDetails.invalid) { return  }
            this.step++
      }
  
      else if(this.step==2){
          this.category_step = true;
          if (this.RatingAndCategoryDetails.invalid) { return }
              this.step++;
      }

      
  
    }
  
    previous(){
      this.step--
     
      if(this.step==1){
        this.title_step = false;
      }
      if(this.step==2){
        this.category_step = false;
      }
     
    }
  
    submit(){
      
      if(this.step==3){
        this.content_step = true;
        if (this.ContentDetails.invalid) { return }
        alert("Well done!!")
      }
    }
  }

