import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionService } from 'src/app/core/services/prediction.service';

@Component({
  selector: 'app-crop-re-form',
  templateUrl: './crop-re-form.component.html',
  styleUrls: ['./crop-re-form.component.css']
})
export class CropReFormComponent implements OnInit {
    formData = {
      N: null,
      P: null,
      K: null,
      temperature: null,
      humidity: null,
      ph: null,
      rainfall: null
    };
    predictionResult: string;
    showResult = false;
  
    constructor(private predictionService: PredictionService) { }
    ngOnInit(): void {
    }

    onSubmit() {
      this.predictionService.predict(this.formData).subscribe((result: string) => {
            this.predictionResult = result;
            this.showResult = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    
  }
  