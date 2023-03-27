import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {ProductService} from "../../../../core/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DecodedToken} from "../../../../core/graphql/graphqlResponse/decodedToken";
import jwt_decode from "jwt-decode";
import {AuthService} from "../../../../core/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  imagePreview: string;
  product: Product;
  selectedFile: File;
  token: string;
  decodedToken: DecodedToken;
  userId: string;

  photoSelected: boolean = true
  pattern = "^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  productForm: FormGroup;

  editMode: boolean = false
  today: Date;
  private tokenSubs: Subscription;
  constructor(private auth: AuthService,private router: Router,  private formBuilder: FormBuilder, private prodService: ProductService,  private currentRoute: ActivatedRoute)
  {  this.today = new Date(); }

  ngOnInit(): void {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    if (this.currentRoute.snapshot.params['id']) {
      this.editMode = true
      let id = this.currentRoute.snapshot.params['id'];
      this.prodService.getProduct(id).subscribe({
        next: (product: Product) => {
          this.product = product;
          this.initFormEdit()
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.initForm()
    }

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
  private initForm() {
    this.productForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      description: ["", [Validators.required]],
      unit: ["", [Validators.required]],
      price: ["", [Validators.required, this.positiveNumberValidator]],
      quantity: ["", [Validators.required, this.positiveNumberValidator]],
      expirationDate: ["", [Validators.required, this.futureDateValidator]],
      category: ["", [Validators.required]],
      }
     )
  }
  private initFormEdit() {
    let name: String = ""
    let description: String = ""
    let price = null
    let quantity = null
    let unit: String = ""
    let expirationDate = null
    let category: String = ""


    const p = this.product
    name = p.name
    description = p.description
    price = p.price
    quantity = p.quantity
    unit = p.unit
    let date = new Date(p.expirationDate);
    expirationDate = date.toISOString().substr(0, 10);
    console.log(expirationDate)
    category = p.category

    this.productForm = this.formBuilder.group({
        name: [name, [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
        description: [description, [Validators.required]],
        unit: [unit, [Validators.required]],
        price: [price, [Validators.required, this.positiveNumberValidator]],
        quantity: [quantity, [Validators.required, this.positiveNumberValidator]],
        expirationDate: [expirationDate, [Validators.required, this.futureDateValidator]],
        category: [category, [Validators.required]],
      }
    )
  }
  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);
    return !isNaN(value) && Number.isFinite(value) && value >= 0 ? null : { invalidPositiveNumber: true };
  }

  private futureDateValidator(control: AbstractControl): {[key: string]: any} | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    if (selectedDate < today) {
      return { 'futureDate': true };
    }
    return null;
  }
  onSubmit() {
    if (!this.editMode){
      this.selectedFile? this.photoSelected = true : this.photoSelected = false
      if (this.photoSelected) {
        Swal.fire({
          title: 'Are you sure you want to add this product ?',
          text: 'This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, add',
        }).then((result) => {
          if (result.isConfirmed) {
            let newProduct = this.productForm.value;
            newProduct.expirationDate = new Date(newProduct.expirationDate);
            this.prodService.createProduct(newProduct, this.selectedFile, this.userId);
            Swal.fire('Added', 'Product has been created successfully.', 'success');
            this.router.navigate(['/marketplace/myProducts']);
          }
        });
      }
    } else {


        Swal.fire({
          title: 'Are you sure you want to update this product ?',
          text: 'This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update',
        }).then((result) => {
          if (result.isConfirmed) {
            let id = this.currentRoute.snapshot.params['id'];
            let newProduct = this.productForm.value;
            newProduct.expirationDate = new Date(newProduct.expirationDate);
            this.prodService.updateProduct(id, newProduct, this.selectedFile, this.userId);
            Swal.fire('Updated', 'Product has been updated successfully.', 'success');
            this.router.navigate(['/marketplace/myProducts']);
          }
        });
      }
    }

}
