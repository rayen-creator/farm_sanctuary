import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PredictionService } from 'src/app/core/services/prediction.service';

@Component({
  selector: 'app-crop-re-form',
  templateUrl: './crop-re-form.component.html',
  styleUrls: ['./crop-re-form.component.css']
})
export class CropReFormComponent implements OnInit {
  predictionResult: string;
  showResult = false;
  myForm: FormGroup;
  formValuesArray: any[] = [];


  
    constructor(private predictionService: PredictionService, private fb : FormBuilder) {}
    ngOnInit(): void {
      this.myForm = this.fb.group({
      N: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      P: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      K: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      temperature: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      humidity: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      ph: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      rainfall: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)])
      });
    }
    

    onSubmit() {  
      //To test my form with constant values
      let values = [104,18, 30, 23.603016, 60.3, 6.7, 140.91]; 

     //To extract only the values of the form in the same order as the form ya nour without them being an object
     const formValues = Object.values(this.myForm.value);
     //empty the formValuesArray array before pushing new values
     this.formValuesArray.splice(0, this.formValuesArray.length);
     this.formValuesArray.push(...formValues);
     console.log(this.formValuesArray);

      //ardha aleya ya rayen :)
      this.predictionService.predict(this.formValuesArray).subscribe({
        next: (result: any) => {
          this.predictionResult = result;
          this.showResult = true;
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // Optional complete callback
        }
      });
      
    }
    
  }
  