import { Component, OnInit } from '@angular/core';
import { CarbonService } from 'src/app/core/services/carbon.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Carbon } from 'src/app/core/models/carbon';

@Component({
  selector: 'app-carbonfootprint',
  templateUrl: './carbonfootprint.component.html',
  styleUrls: ['./carbonfootprint.component.css']
})
export class CarbonfootprintComponent implements OnInit {

  EnergyEmissions!: FormGroup;
  ElectricityEmissions!: FormGroup;
  FertilizerEmissions!: FormGroup;
  LivestockEmissions!: FormGroup;
  CropEmissions!: FormGroup;
  title_step = false;
  category_step = false;
  content_step = false;
  step = 1;
  carbon : Carbon;

  constructor(private formBuilder: FormBuilder,
    private crbonService: CarbonService,) { }
  ngOnInit(): void {
    this.EnergyEmissions = this.formBuilder.group({
      dieseleconsumption: ['', Validators.required],
      gasolineconsumption: ['', Validators.required],
    });

    this.ElectricityEmissions = this.formBuilder.group({
      typeofcarbon: ['', Validators.required],
      usageInKwh: ['', Validators.required],
    });

    this.FertilizerEmissions = this.formBuilder.group({
      fertilizerConsumption: ['', Validators.required],
      fertilizerType: ['', Validators.required],
    });
    this.LivestockEmissions = this.formBuilder.group({
      numBeefCattle: ['', Validators.required],
      numDairyCattle: ['', Validators.required],
      numPigs: ['', Validators.required],
      numPoultry: ['', Validators.required],
      numSheep: ['', Validators.required],
      numGoats: ['', Validators.required],
    });
    this.CropEmissions = this.formBuilder.group({
      cropTransportDistance: ['', Validators.required],
      fuelused: ['', Validators.required],
      typeoffuel: ['', Validators.required],
      landsize: ['', Validators.required],
      cropProduction: ['', Validators.required],
      typeofcrop: ['', Validators.required],
    });
  }

  get dieseleconsumption() { return this.EnergyEmissions.controls; }
  get gasolineconsumption() { return this.EnergyEmissions.controls; }

  get typeofcarbon() { return this.ElectricityEmissions.controls; }
  get usageInKwh() { return this.ElectricityEmissions.controls; }

  get fertilizerConsumption() { return this.FertilizerEmissions.controls; }
  get fertilizerType() { return this.FertilizerEmissions.controls; }

  get numBeefCattle() { return this.LivestockEmissions.controls; }
  get numDairyCattle() { return this.LivestockEmissions.controls; }
  get numPigs() { return this.LivestockEmissions.controls; }
  get numPoultry() { return this.LivestockEmissions.controls; }
  get numSheep() { return this.LivestockEmissions.controls; }
  get numGoats() { return this.LivestockEmissions.controls; }

  get cropTransportDistance() { return this.CropEmissions.controls; }
  get fuelused() { return this.CropEmissions.controls; }
  get typeoffuel() { return this.CropEmissions.controls; }
  get landsize() { return this.CropEmissions.controls; }
  get cropProduction() { return this.CropEmissions.controls; }
  get typeofcrop() { return this.CropEmissions.controls; }

  badWordValidator(badWords: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.value.toLowerCase();
      const hasBadWord = badWords.some((word) => input.includes(word.toLowerCase()));

      return hasBadWord ? { badWord: true } : null;
    };
  }

  next() {
    // <li [ngClass]="step>=1 ? 'active' : 'inactive'">EnergyEmissions</li>
    // <li [ngClass]="step>=2 ? 'active' : 'inactive'">ElectricityEmissions</li>
    // <li [ngClass]="step==3 ? 'active' : 'inactive'">FertilizerEmissions</li>
    // <li [ngClass]="step==4 ? 'active' : 'inactive'">LivestockEmissions</li>
    // <li [ngClass]="step==5 ? 'active' : 'inactive'">CropEmissions</li>
    if (this.step == 1) {


      this.step++
    }

    else if (this.step == 2) {


      this.step++;
    }
    else if (this.step == 3) {


      this.step++;
    }
    else if (this.step == 4) {

      this.step++;
    }
    else if (this.step == 5) {


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
    if (this.step == 3) {
      this.category_step = false;
    }
    if (this.step == 4) {
      this.category_step = false;
    }


  }

  onSubmit() {

        let EnergyEmission = this.EnergyEmissions.value;


        let ElectricityEmission = this.ElectricityEmissions.value;


        let FertilizerEmission = this.FertilizerEmissions.value;


        let LivestockEmission = this.LivestockEmissions.value;

        let CropEmission = this.CropEmissions.value;




        const dieseleconsumptio = EnergyEmission.dieseleconsumption;
        const gasolineconsumptio = EnergyEmission.gasolineconsumption;

        const typeofcarbo = ElectricityEmission.typeofcarbon;
        const usageInKw = ElectricityEmission.usageInKwh;

        const fertilizerConsumptio = FertilizerEmission.fertilizerConsumption;
        const fertilizerTyp = FertilizerEmission.fertilizerType;

        const numBeefCattl = LivestockEmission.numBeefCattle;
        const numDairyCattl = LivestockEmission.numDairyCattle;
        const numPig = LivestockEmission.numPigs;
        const numPoultr = LivestockEmission.numPoultry;
        const numShee = LivestockEmission.numSheep;
        const numGoat = LivestockEmission.numGoats;

        const cropTransportDistanc = CropEmission.cropTransportDistance;
        const fueluse = CropEmission.fuelused;
        const typeoffue = CropEmission.typeoffuel;
        const landsiz = CropEmission.landsize;
        const cropProductio = CropEmission.cropProduction;
        const typeofcro = CropEmission.typeofcrop;
      
        this.crbonService.createCarbonfootprint(
          dieseleconsumptio, gasolineconsumptio,
          usageInKw, typeofcarbo,
          fertilizerConsumptio, fertilizerTyp,
          numBeefCattl, numDairyCattl, numPig, numPoultr, numShee, numGoat,
          cropTransportDistanc, cropProductio, typeofcro, fueluse, typeoffue, landsiz).subscribe({
            next: (res:any) => {
              //createCarbon
             this.carbon =  res.data.createCarbon.carbon as Carbon ;
              console.log(this.carbon);
            },
            error: (err) => {
              console.log(err);
            },
          });


      };


    
  }








