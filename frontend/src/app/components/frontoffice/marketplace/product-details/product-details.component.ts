import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../core/models/product";
import {ProductService} from "../../../../core/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import Swal from "sweetalert2";
import {Feedback} from "../../../../core/models/feedback";
import {DecodedToken} from "../../../../core/graphql/graphqlResponse/decodedToken";
import {Subscription} from "rxjs";
import jwt_decode from "jwt-decode";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: Product;

  reviewForm: FormGroup;

  token: string;
  decodedToken: DecodedToken;
  userId: string;
  private tokenSubs: Subscription;
  constructor(private productService: ProductService,private toastr: ToastrService, private router:Router, private currentRoute: ActivatedRoute,   private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    this.getProduct()
    this.initForm()
  }
  getProduct(){
    let id = this.currentRoute.snapshot.params['id'];
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        console.log(this.product);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private initForm() {
    this.reviewForm = this.formBuilder.group({
        rating: ["", [Validators.required]],
        comment: ["", [Validators.required]],
      }
    )
  }

  submit() {
    Swal.fire({
      title: 'Are you sure you want to add this review?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add',
    }).then((result) => {
      if (result.isConfirmed) {
        let idProd = this.currentRoute.snapshot.params['id'];
        let review = this.reviewForm.value;
        let comment = review.comment
        let rating = parseInt(review.rating)
        this.productService.addReview(idProd, this.userId,comment,rating);
        this.toastr.success('review added successfully ', 'success');

      }
    });
  }

}
