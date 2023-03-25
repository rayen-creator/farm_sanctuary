import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {updateUser} from "../../../../core/graphql/queries/graphql.queries.user";
import {UserUpdateResponse} from "../../../../core/graphql/graphqlResponse/userUpdateResponse";
import {ProductService} from "../../../../core/services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  imagePreview: string;
  product: Product;
  selectedFile: File;

  pattern = "^[ a-zA-Z0-9][a-zA-Z0-9 ]*$";
  productForm: FormGroup;

  today: Date;
  constructor(private sanitizer: DomSanitizer,  private formBuilder: FormBuilder, private prodService: ProductService)
  {  this.today = new Date(); }

  ngOnInit(): void {
    this.initForm()
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
  private initForm() {
    this.productForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.pattern(this.pattern), Validators.minLength(3)]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required, this.positiveNumberValidator]],
      location: ["", [Validators.required]],
      expirationDate: ["", [Validators.required]],
      category: ["", [Validators.required]],
      }
     )
  }
  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = parseInt(control.value, 10);
    return !isNaN(value) && Number.isFinite(value) && value >= 0 ? null : { invalidPositiveNumber: true };
  }
  onSubmit() {
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
       this.prodService.createProduct(newProduct);
        Swal.fire('Added', 'Product has been created successfully.', 'success');
      }
    });
  }
}
